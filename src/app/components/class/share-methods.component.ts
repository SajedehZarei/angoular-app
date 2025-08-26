import {
  Observable,
  catchError,
  finalize,
  map,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { DialogService, DialogRef } from '@ngneat/dialog';
import { BaseComponent } from './base.component';
import { NotificationsService } from '../../services/app/notifications.service';
import { VariablesService } from '../../services/app/variables.service';
import { BaseApiService } from '../../services/api/base-api.service';
import { QuestionDialogComponent } from '../features/question-dialog/question-dialog.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: '',
  standalone: true,
  template: '',
})
export class ShareMethodsBaseComponent
  extends BaseComponent
  implements OnDestroy
{
  public constructor(
    protected notificationsService: NotificationsService,
    protected dialogService: DialogService,
    protected variablesService: VariablesService,
    protected baseApiService: BaseApiService
  ) {
    super();
  }
  protected dialogRef: DialogRef;

  protected async callComponentDialog(
    componentName: any,
    params?: any,
    sizeDialog: string = 'xl'
  ) {
    if (typeof params == 'number') {
      params = {
        idNumber: params,
      };
    }
    this.dialogRef = this.dialogService.open(componentName, {
      data: {
        params: params ? params : null,
      },
      size: sizeDialog,
    });

    this.variablesService.clickAcceptDialog.pipe(take(1)).subscribe({
      next: async (value: any) => {
        this.actionAfterAcceptDialog(value);
      },
      error: (err: any) => {
        this.notificationsService.errorToastr(err.message);
        this.unSetLoading();
      },
    });
  }

  protected callQuestionDialog(
    method: Observable<any> | null,
    title?: string,
    question?: string,
    message?: string
  ): void {
    this.dialogRef = this.dialogService.open(QuestionDialogComponent, {
      data: {
        question: question ? question : 'از حذف رکورد مطمئن هستید؟',
        title: title ? title : 'حذف رکورد',
      },
      width: '400px',
    });

    this.dialogRef.afterClosed$
      .pipe(
        take(1),
        switchMap((typeClose) => {
          if (typeClose === 'accept') {
            return this.variablesService.clickAcceptQuestionDialog.pipe(
              take(1)
            );
          } else {
            this.actionAfterCloseDialog();
            return of('reject'); // بدون عملیات اضافی
          }
        })
      )
      .subscribe((result: string | null) => {
        if (result != 'reject') {
          if (method) {
            method.subscribe({
              next: (x) => {
                if (x.status) {
                  this.notificationsService.successToastr(
                    message || 'رکورد موردنظر با موفقیت حذف شد'
                  );
                }
              },
              complete: () => {
                this.actionAfterAcceptQuestion();
              },
              error: (err) => {
                this.unSetLoading();
                this.notificationsService.errorToastr(err.message);
              },
            });
          } else {
            this.actionAfterAcceptQuestion();
          }
        }
      });
  }

  protected callApi<T>(
    method: Observable<any>,
    message?: string
  ): Observable<{ result: T; total?: number }> {
    this.setLoading();

    return method.pipe(
      catchError((err) => {
        this.unSetLoading();

        if (err.status === 0) {
          this.notificationsService.errorToastr(
            'ارتباط قطع شد. چند دقیقه دیگر امتحان کنید'
          );
        } else if (err.error?.errors) {
          this.notificationsService.errorToastr(err.error.errors);
        }

        return throwError(err);
      }),
      tap((res) => {
        if (res.statusCode == 200) {
          message && this.notificationsService.successToastr(message);
        } else {
          this.notificationsService.errorToastr(
            res.message[0] || 'خطای ناشناخته'
          );
        }
      }),
      map((res) => ({
        result: res.result as T,
        total: res.total || null,
      })),
      finalize(() => {
        this.unSetLoading();
      })
    );
  }

  protected actionAfterAcceptDialog(value?: any) {}
  protected actionAfterCloseDialog(value?: any) {}
  protected actionAfterAcceptQuestion(value?: any) {}

  protected actionAfterFind() {}
  protected actionAfterCreate() {}
  protected actionAfterCallApi() {}
  protected actionAfterUpdate() {}

  setUrlBack(url: string) {
    this.variablesService.url.update((values) => {
      return [...values, url];
    });
  }

  printClick(method: Observable<any>) {
    this.setLoading();
    method.subscribe({
      next: (x) => {
        if (x.success == false) {
          this.notificationsService.errorToastr(x.message);
        }
        const file = new Blob([x], { type: 'application/pdf' });
        const fileURL = window.URL.createObjectURL(file);
        this.unSetLoading();
        window.open(fileURL);
      },
      error: (err) => {
        this.unSetLoading();
        this.notificationsService.errorToastr(err.message);
      },
    });
  }

  downloadBlobFile(
    method: Observable<any>,
    fileName: string = 'report',
    fileType: string = 'xlsx'
  ) {
    this.setLoading();
    method.subscribe({
      next: (response: Blob) => {
        this.saveFile(response, fileName, fileType);
        this.unSetLoading();
      },
      error: async (err) => {
        this.unSetLoading();
        var errorMessage = '';
        var errorDto = await err.error.text();
        const parsedErrorDto = JSON.parse(errorDto);

        parsedErrorDto.message.forEach((element: string) => {
          errorMessage = element + ' ';
        });

        this.notificationsService.errorToastr(errorMessage);
      },
    });
  }

  protected saveFile(data: Blob, fileName: string, fileType: string): void {
    if (fileType == 'xlsx') {
      var typefile =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else {
      var typefile = '';
    }
    const blob = new Blob([data], { type: typefile });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName + '.' + fileType;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  public reciveData(method: Observable<any>) {
    this.setLoading();
    this._findSubacribtion = method.subscribe({
      next: async (res) => {
        if (res.success) {
          this.unSetLoading();
          this.data =
            res.result && res.result.data ? res.result.data : res.result;
        } else {
          this.unSetLoading();
          this.notificationsService.errorToastr(res.message);
        }
      },
      complete: () => {
        this.actionAfterFind();
      },
      error: (err) => {
        this.unSetLoading();
        this.notificationsService.errorToastr(err.message);
      },
    });

    this.unSubscribtions.push(this._findSubacribtion);
  }
}
