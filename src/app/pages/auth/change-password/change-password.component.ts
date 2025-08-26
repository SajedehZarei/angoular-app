import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '@ngneat/dialog';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../services/app/notifications.service';
import { VariablesService } from '../../../services/app/variables.service';
import { LocalStorageService } from '../../../services/app/local-storage.service';
import lottie from 'lottie-web';
import { InputComponent } from '../../../components/shared/input/input.component';
import { ButtonComponent } from '../../../components/shared/button/button.component';
import { LoadingPageComponent } from '../../../components/features/loading/loading-page/loading-page.component';
import { BaseApiService } from '../../../services/api/base-api.service';
import { FormBuilderComponent } from '../../../components/class/form-builder.component';

@Component({
  selector: 'change-password',
  standalone: true,
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  imports: [InputComponent, ButtonComponent, LoadingPageComponent],
})
export class ChangePasswordComponent
  extends FormBuilderComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('lottieContainer', { static: true }) containerRef!: ElementRef;
  @ViewChild('lottieContainer2', { static: true }) containerRef2!: ElementRef;
  @ViewChild('lottieContainer3', { static: true }) containerRef3!: ElementRef;
  constructor(
    protected notificationsService: NotificationsService,
    protected dialogService: DialogService,
    protected formBuilder: FormBuilder,
    protected variablesService: VariablesService,
    protected baseApiService: BaseApiService,
    private _router: Router,
    private _localStorage: LocalStorageService
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
  ngAfterViewInit(): void {
    lottie.loadAnimation({
      container: this.containerRef.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/images/auth-page/admin-panel-anim2.json', // مسیر فایل Lottie
    });
    lottie.loadAnimation({
      container: this.containerRef2.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/images/auth-page/admin-panel-anim1.json', // مسیر فایل Lottie
    });
    lottie.loadAnimation({
      container: this.containerRef3.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/images/auth-page/admin-panel-anim3.json', // مسیر فایل Lottie
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      newPassword: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(45),
        ],
      ],
      repeatePassword: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(45),
        ],
      ],
    });
  }

  submitForm() {
    if (
      this.form.get('newPassword').value ===
      this.form.get('repeatePassword').value
    ) {
      const body = {
        usernameOrPhoneNumber: this._localStorage.getPhoneNumber(),
        newPassword: this.form.get('newPassword').value,
      };

      this.callApiAndSubscribe(
        this.baseApiService.UpdateApi(
          '/Gateway/v1/api/Authentication/ResetPassword',
          body
        ),
        'update',
        'رمز شما تغییر یافت.لطفا با رمز جدید وارد شوید'
      );
    } else {
      this.notificationsService.errorToastr('رمز و تکرار آن یکسان نیست');
    }
  }

  actionAfterUpdate() {
    this.returnLoginForm();
  }

  returnLoginForm() {
    this._router.navigate(['sign-in']);
  }
}
