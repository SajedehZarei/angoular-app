import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '@ngneat/dialog';
import { NotificationsService } from '../../../../../services/app/notifications.service';
import { VariablesService } from '../../../../../services/app/variables.service';
import { Extensions } from '../../../../../tools/extensions';
import { LoadingPageComponent } from '../../../../../components/features/loading/loading-page/loading-page.component';
import { ButtonComponent } from '../../../../../components/shared/button/button.component';
import { InputComponent } from '../../../../../components/shared/input/input.component';
import { FormBuilderComponent } from '../../../../../components/class/form-builder.component';
import { BaseApiService } from '../../../../../services/api/base-api.service';
import { UploadFileComponent } from '../../../../../components/features/upload-file/upload-file.component';
import { APP_ENV } from '../../../../../../environment.config';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
  imports: [
    LoadingPageComponent,
    ButtonComponent,
    InputComponent,
    UploadFileComponent,
  ],
  standalone: true,
})
export class CategoryFormComponent
  extends FormBuilderComponent
  implements OnInit
{
  private env = inject(APP_ENV);
  constructor(
    protected notificationsService: NotificationsService,
    protected dialogService: DialogService,
    protected variablesService: VariablesService,
    protected baseApiService: BaseApiService,
    protected formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _extensions: Extensions
  ) {
    super(
      notificationsService,
      dialogService,
      variablesService,
      formBuilder,
      baseApiService
    );
    this.initForm();
  }

  ngOnInit(): void {
    if (this._activatedRoute.snapshot.paramMap.get('id')) {
      this.indexItem(this._activatedRoute.snapshot.paramMap.get('id')!);
    }

    this.initForm();
  }

  initForm() {
   this.form = this.formBuilder.group({
  fullName: ['', [Validators.required, Validators.maxLength(45)]],
  personnelCode: ['', [Validators.required, Validators.maxLength(10)]],
  email: ['', [Validators.required, Validators.email]],
  phoneNumber: ['', [Validators.required, Validators.maxLength(11)]],
  profileImage: [null],
});
  }

  indexItem(itemId: string) {
    this.callApi(
      this.baseApiService.GetApi(
        `/Category/${itemId}`,
        this.env.APIEndpointMarket
      )
    ).subscribe({
      next: (res) => {
        this.findData = res.result;
      },
      complete: () => {
        this.initForm();
      },
    });
  }

  createItem() {
    this.callApiAndSubscribe(
      this.baseApiService.PostApi(
        '/Category/Add',
        this.convertFormData(this.form),
        this.env.APIEndpointMarket
      ),
      'create'
    );
  }

  updateItem(itemId: string) {
    this.callApiAndSubscribe(
      this.baseApiService.UpdateApi(
        '/Category/Update',
        this.convertFormData(this.form),
        this.env.APIEndpointMarket
      ),
      'update'
    );
  }

  protected actionAfterCreate(): void {
    this.returnbBackPage();
  }
  
  protected actionAfterUpdate(): void {
    this.returnbBackPage();
  }

  returnbBackPage(){
    this._router.navigate(['/dashboard/management-category/category'])
  }
}
