import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '@ngneat/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../../../services/app/notifications.service';
import { VariablesService } from '../../../services/app/variables.service';
import { PhoneMaskPipe } from '../../../tools/pipes/phone-mask.pipe';
import { NgOtpInputModule } from 'ng-otp-input';
import { LocalStorageService } from '../../../services/app/local-storage.service';
import lottie from 'lottie-web';
import { FormBuilderComponent } from '../../../components/class/form-builder.component';
import { ButtonComponent } from '../../../components/shared/button/button.component';
import { LoadingPageComponent } from '../../../components/features/loading/loading-page/loading-page.component';
import { BaseApiService } from '../../../services/api/base-api.service';
@Component({
  selector: 'verify-code',
  standalone: true,
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css'],
  imports: [
    PhoneMaskPipe,
    NgOtpInputModule,
    ButtonComponent,
    LoadingPageComponent,
  ],
})
export class VerifyCodeComponent
  extends FormBuilderComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('value1', { static: true }) value1: ElementRef;
  @ViewChild('value2', { static: true }) value2: ElementRef;
  @ViewChild('value3', { static: true }) value3: ElementRef;
  @ViewChild('value4', { static: true }) value4: ElementRef;
  @ViewChild('value5', { static: true }) value5: ElementRef;
  @ViewChild('lottieContainer', { static: true }) containerRef!: ElementRef;
  @ViewChild('lottieContainer2', { static: true }) containerRef2!: ElementRef;
  @ViewChild('lottieContainer3', { static: true }) containerRef3!: ElementRef;

  focusIndex: number = 1;
  resendText: string = 'ارسال مجدد کد';
  resendDisabled: boolean = false;
  timer: any;
  minute: number = 3;
  second: number = 60;
  infoUser;
  phoneNumber: string;
  typeVerifyCode;

  constructor(
    protected notificationsService: NotificationsService,
    protected dialogService: DialogService,
    protected formBuilder: FormBuilder,
    protected variablesService: VariablesService,
    protected baseApiService: BaseApiService,
    private _router: Router,
    private _localStorage: LocalStorageService,
    private activatedRoute: ActivatedRoute
  ) {
    super(
      notificationsService,
      dialogService,
      variablesService,
      formBuilder,
      baseApiService
    );
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
    this.resendCode();
    this.initForm();
    this.typeVerifyCode = this.activatedRoute.snapshot.data;
   /* if (this._localStorage.getUser()) {
      this.infoUser = this._localStorage.getUser()!;
      this.phoneNumber = this.infoUser.phoneNumber;
    } else {
      this.infoUser = null;
      this.phoneNumber = this._localStorage.getPhoneNumber()!;
    }

    // this.phoneNumber = JSON.parse(localStorage.getItem('phoneNumber')!);
    if (this.typeVerifyCode.typeCode == 'login') {
      // this.username = this.infoUser.username;
    } else if (this.typeVerifyCode.typeCode == 'changePassword') {
      // this.sendCode()
    }*/
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      codeVerify: [null, [Validators.required]],
    });
  }

  resendVerifyCode() {
    if (this.typeVerifyCode.typeCode == 'login') {
      const body = {
        usernameOrPhoneNumber: this.phoneNumber,
        password: localStorage.getItem('password'),
      };

      this.callApiAndSubscribe(
        this.baseApiService.PostApi(
          '/Gateway/v1/api/Authentication/TwoFactorLogin',
          body
        ),
        'create',
        'کد تایید به شماره همراه شما ارسال شد...'
      );
    } else if (this.typeVerifyCode.typeCode == 'changePassword') {
      this.callApiAndSubscribe(
        this.baseApiService.GetApi(
          `/Gateway/v1/api/Authentication/SendResetPasswordVerificationCode?UsernameOrPhoneNumber=${this.phoneNumber}`
        ),
        'callApi',
        'کد تایید به شماره همراه شما ارسال شد...'
      );
    }
  }

  actionAfterCallApi() {
    this.resendCode();
  }

  resendCode() {
    this.resendDisabled = true;

    this.timer = setInterval(() => {
      if (this.minute >= 0) {
        if (this.second > 0) {
          this.second--;
        }

        let showSecond = this.second < 10 ? '0' + this.second : this.second;
        let showMinute = this.minute;

        if (this.second == 0) {
          this.minute--;
          this.second = 60;
          showMinute = this.minute > 0 ? this.minute : 0;
        }
        this.resendText =
          '0' + showMinute + ':' + showSecond + ' ' + 'ثانیه تا ارسال مجدد کد';
      } else {
        clearInterval(this.timer);
        this.resendDisabled = false;
        this.second = 60;
        this.minute = 3;
        this.resendText = 'ارسال مجدد کد';
      }
    }, 1000);
  }

  submitCode() {
    this._router.navigate(['dashboard/home']);
    /*if (this.typeVerifyCode.typeCode == 'login') {
      const body = {
        code: this.form.get('codeVerify').value,
        username: this.infoUser.username,
      };

      this.callApi(
        this.baseApiService.PostApi(
          '/Gateway/v1/api/Authentication/VerifyTwoFactorLoginCode',
          body
        )
      ).subscribe({
        next: (res) => {
          this.findData = res.result;
        },
        complete: () => {
          this.saveData();
        },
      });
    } else if (this.typeVerifyCode.typeCode == 'changePassword') {
      const body = {
        verificationCode: this.form.get('codeVerify').value,
        usernameOrPhoneNumber: this.phoneNumber,
      };

      this.callApi(
        this.baseApiService.PostApi(
          '/Gateway/v1/api/Authentication/VerifyResetPasswordVerificationCode',
          body
        )
      ).subscribe({
        next: (res) => {
          this.findData = res.result;
        },
        complete: () => {
          this.saveData();
        },
      });
    }*/
  }
  returnLoginForm() {
    this._router.navigate(['sign-in']);
  }

  saveData() {
    localStorage.removeItem('password');
    if (this.typeVerifyCode.typeCode == 'login') {
      this._localStorage.saveToken(this.findData.accessToken);
      this._localStorage.saveRefreshToken(this.findData.refreshToken);
      // this._localStorage.saveUrls('dashboard/managment-mission');
      this._router.navigate(['dashboard/home']);
    } else if (this.typeVerifyCode.typeCode == 'changePassword') {
      this._router.navigate(['sign-in/change-password']);
    }
  }

  public enterClicked(event): void {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      this.submitCode();
    }
  }
}
