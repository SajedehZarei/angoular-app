import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogCloseDirective, DialogRef, DialogService } from '@ngneat/dialog';
import { NotificationsService } from '../../../services/app/notifications.service';
import { VariablesService } from '../../../services/app/variables.service';
import { FormBuilderComponent } from '../../../components/class/form-builder.component';
import { LabelComponent } from '../../../components/shared/label/label.component';
import { InputComponent } from '../../../components/shared/input/input.component';
import { ButtonComponent } from '../../../components/shared/button/button.component';
import { LoadingBoxComponent } from '../../../components/features/loading/loading-box/loading-box.component';
import { BaseApiService } from '../../../services/api/base-api.service';

@Component({
  selector: 'get-phone-number',
  standalone: true,
  templateUrl: './get-phone-number.component.html',
  styleUrls: ['./get-phone-number.component.css'],
  imports: [
    LabelComponent,
    InputComponent,
    ButtonComponent,
    LoadingBoxComponent,
    DialogCloseDirective,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class GetPhoneNumberComponent
  extends FormBuilderComponent
  implements OnInit
{
  ref: DialogRef<any> = inject(DialogRef);
  constructor(
    protected notificationsService: NotificationsService,
    protected dialogService: DialogService,
    protected formBuilder: FormBuilder,
    protected variablesService: VariablesService,
    protected baseApiService: BaseApiService,
    private _router: Router
  ) {
    super(
      notificationsService,
      dialogService,
      variablesService,
      formBuilder,
      baseApiService
    );
    this.initForm();
    this.ref.updateConfig({
      size: 'sm',
      height: 'auto',
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      phoneNumber: [
        null,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
    });
  }

  sendCode() {
    this.callApiAndSubscribe(
      this.baseApiService.GetApi(
        `/Gateway/v1/api/Authentication/SendResetPasswordVerificationCode?UsernameOrPhoneNumber=${
          this.form.get('phoneNumber').value
        }`
      ),
      'create'
      ,
      'کد تایید به شماره همراه شما ارسال شد...'
    );
  }
  actionAfterCreate() {
    this.ref.close();
    localStorage.setItem('phoneNumber', this.form.get('phoneNumber').value);
    this._router.navigate(['sign-in/verify-code-change-password']);
  }
}
