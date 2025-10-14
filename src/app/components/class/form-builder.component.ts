import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from '@ngneat/dialog';
import { ShareMethodsBaseComponent } from './share-methods.component';
import { NotificationsService } from '../../services/app/notifications.service';
import { VariablesService } from '../../services/app/variables.service';
import { BaseApiService } from '../../services/api/base-api.service';
import { catchError, Observable, throwError } from 'rxjs';

@Component({
  selector: '',
  standalone: true,
  template: '',
})
export class FormBuilderComponent extends ShareMethodsBaseComponent {
  public form: FormGroup | any;
  attachments: Array<any> = [];
  previews: Array<any> = [];
  repeatAttachment: boolean = false;
  fileName: string = 'Drop files to attach, or browse';

  public constructor(
    protected notificationsService: NotificationsService,
    protected dialogService: DialogService,
    protected variablesService: VariablesService,
    protected formBuilder: FormBuilder,
    protected baseApiService: BaseApiService
  ) {
    super(
      notificationsService,
      dialogService,
      variablesService,
      baseApiService
    );
  }

  protected initForm() {}

  protected callApiAndSubscribe(
    method: Observable<any>,
    typeAction?: string,
    message?: string,
    form: FormGroup = this.form,
  ): void {
     if (!form.valid) {
      this.markFormGroupTouched(form);
    } else {
    this.setLoading();

    const sub = method
      .pipe(
        catchError((err) => {
          this.unSetLoading();
          if (err.status === 0) {
            this.notificationsService.errorToastr(
              'ارتباط قطع شد. چند دقیقه دیگر امتحان کنید'
            );
          }
          return throwError(err);
        })
      )
      .subscribe({
        next: (res) => {
          this.unSetLoading();

          if (res.statusCode == 200) {
            this.notificationsService.successToastr(
              message ? message : res.message
            );

            this.data = res.result;
            this.totalItem = res.total || null;
          } else {
            this.notificationsService.errorToastr(
              res.message[0] || 'خطای ناشناخته'
            );
          }
        },
 error: (err) => {
  this.unSetLoading();
  let errorMessage = '';

  if (err.error?.message && Array.isArray(err.error.message)) {
    err.error.message.forEach((element: string) => {
      errorMessage += element + ' ';
    });
  } else if (err.error?.message) {
    // اگر پیام به صورت string بود
    errorMessage = err.error.message;
  } else {
    errorMessage = 'خطای ناشناخته رخ داده است';
  }

  this.notificationsService.errorToastr(errorMessage);
} , 

        complete: () => {
          switch (typeAction) {
            case 'create':
              this.actionAfterCreate();
              break;
            case 'update':
              this.actionAfterUpdate();
              break;
            case 'callApi':
              this.actionAfterCallApi();
              break;
            default:
              this.actionAfterCallApi();
              break;
          }
        },
      });

    this.unSubscribtions.push(sub);
    }
  }

  protected convertPriceValueToNumber(arrayPipe: Array<FormControl>): void {
    for (let i = 0; i < arrayPipe.length; i++) {
      let convertedExamPriceValue = Number(
        arrayPipe[i]?.value
          .toString()
          .replace(/\D/g, '')
          .replace(/\B(?=(\d{3})+(?!\d))/g, '')
      );
      arrayPipe[i]?.setValue(convertedExamPriceValue);
    }
  }

  // protected currencyTransform(arrayPipe: Array<FormControl>): void {
  // 	const currencyPipe = new CurrencySeparatorPipe();
  // 	for (let i = 0; i < arrayPipe.length; i++) {
  // 		let convertPriceToCurrency = currencyPipe.transform(
  // 			arrayPipe[i].value,
  // 		);
  // 		arrayPipe[i].setValue(convertPriceToCurrency);
  // 	}
  // }

  protected markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  uploadFiles(files: Array<File>, control: FormControl) {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files', file);
    });

    control.setValue(formData);
  }

  convertFormData(formGroup: FormGroup): FormData {
    const formData = new FormData();

    Object.entries(formGroup.controls).forEach(([key, control]) => {
      const value = control.value;

      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    });

    return formData;
  }

  advanceConvertFormData(
    formGroup: FormGroup | FormArray,
    formData: FormData = new FormData(),
    parentKey: string = ''
  ): FormData {
    Object.entries(formGroup.controls).forEach(([key, control]) => {
      const value = control.value;
      const controlKey = parentKey ? `${parentKey}[${key}]` : key;

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.advanceConvertFormData(control, formData, controlKey);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${controlKey}[${index}]`, item);
        });
      } else {
        formData.append(controlKey, value);
      }
    });

    return formData;
  }

  onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragEnter(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent, maxCountItem: number = 1) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    this.handleFiles(files, maxCountItem);
  }

  handleFileInput(event: Event, maxCountItem: number = 1) {
    const files = (event.target as HTMLInputElement).files;
    this.handleFiles(files, maxCountItem);
  }

  handleFiles(files: any, maxCountItem: number = 1) {
    const reader = new FileReader();
    if (this.attachments.length < maxCountItem) {
      for (let i = 0; i < files.length; i++) {
        // if (files[i].type.startsWith('image')) {
        if (this.attachments.length == 0) {
          this.attachments.push(files[i]);

          this.fileName = '(' + this.attachments.length + ')' + ' فایل ';
          reader.onload = (e: any) => {
            this.previews.push(e.target.result);
          };
          reader.readAsDataURL(files[i]);
        } else {
          this.attachments.forEach((attachment) => {
            if (attachment.name == files[i].name) {
              this.repeatAttachment = true;
            }
          });

          if (!this.repeatAttachment) {
            this.attachments.push(files[i]);

            this.fileName = '(' + this.attachments.length + ')' + ' فایل ';

            reader.onload = (e: any) => {
              this.previews.push(e.target.result);
            };
            reader.readAsDataURL(files[i]);
          } else {
            this.repeatAttachment = false;
            this.notificationsService.errorToastr(
              'فایل انتخابی شما تکراری است'
            );
          }
        }
        // } else {
        //   this.notificationsService.errorToastr(
        //     'فایل های تصویری مجاز می باشند'
        //   );
        // }
      }
    } else {
      this.notificationsService.errorToastr(`محدودیت در تعداد آپلود`);
    }
  }

  // removeAttachment(index: number) {
  //   // this.attachments.splice(index, 1);
  //   // this.previews.splice(index, 1);
  //   // if (this.attachments.length > 0) {
  //   //   this.fileName = '(' + this.attachments.length + ')' + ' فایل ';
  //   // } else {
  //   //   this.fileName = 'Drop files to attach, or browse';
  //   // }
  // }
}
