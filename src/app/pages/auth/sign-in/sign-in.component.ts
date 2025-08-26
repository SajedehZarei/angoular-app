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
import { GetPhoneNumberComponent } from '../get-phone-number/get-phone-number.component';
import { NotificationsService } from '../../../services/app/notifications.service';
import { VariablesService } from '../../../services/app/variables.service';
import { LocalStorageService } from '../../../services/app/local-storage.service';
import lottie from 'lottie-web';
import { InputComponent } from '../../../components/shared/input/input.component';
import { CheckBoxComponent } from '../../../components/shared/checkbox/checkbox.component';
import { ButtonComponent } from '../../../components/shared/button/button.component';
import { LoadingPageComponent } from '../../../components/features/loading/loading-page/loading-page.component';
import { FormBuilderComponent } from '../../../components/class/form-builder.component';
import { BaseApiService } from '../../../services/api/base-api.service';

@Component({
  selector: 'sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [
    InputComponent,
    CheckBoxComponent,
    ButtonComponent,
    LoadingPageComponent,
  ],
})
export class SignInComponent
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
    private _localStorage: LocalStorageService,
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
      usernameOrPhoneNumber: [
        null,
        [Validators.required, Validators.minLength(5)],
      ],
      password: [null, [Validators.required, Validators.minLength(8)]],
      remember: [false, []],
    });
  }

  clickLogin() {
    // this._router.navigate(['sign-in/verify-code-login']);
    this.callApiAndSubscribe(
      this.baseApiService.PostApi(
        '/Gateway/v1/api/Authentication/TwoFactorLogin',
        this.form.value
      ),
      'create',
      'کد تایید به شماره همراه شما ارسال شد...'
    );
  }

  forgetPassword() {
    this.callComponentDialog(GetPhoneNumberComponent);
  }

  actionAfterAcceptDialog(value) {
    this._router.navigate(['sign-in/verify-code-login']);
  }

  protected actionAfterCreate(value?: any): void {
    const infoUser = {
      phoneNumber: this.data.phoneNumber,
      username: this.data.username,
      email: this.data.email,
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      roles: this.data.roles,
    };

    this._localStorage.saveUser(infoUser);
    this._localStorage.savePassword(this.form.get('password').value);
    this.variablesService.nameUser.set(this.data.firstName + ' ' + this.data.lastName)
    this._router.navigate(['sign-in/verify-code-login']);
  }

  public enterClicked(event): void {
    if (this.form.valid) {
      if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
        this.clickLogin();
      }
    }
  }
}
