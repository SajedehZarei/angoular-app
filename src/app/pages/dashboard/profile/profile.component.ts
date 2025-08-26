import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '@ngneat/dialog';
import { NotificationsService } from '../../../services/app/notifications.service';
import { VariablesService } from '../../../services/app/variables.service';
import { Extensions } from '../../../tools/extensions';
import { LoadingPageComponent } from '../../../components/features/loading/loading-page/loading-page.component';
import { ButtonComponent } from '../../../components/shared/button/button.component';
import { InputComponent } from '../../../components/shared/input/input.component';
import { HeaderDashboardComponent } from '../../../components/layout/header-dashboard/header-dashboard.component';
import { FormBuilderComponent } from '../../../components/class/form-builder.component';
import { BaseApiService } from '../../../services/api/base-api.service';
import { LocalStorageService } from '../../../services/app/local-storage.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [
    LoadingPageComponent,
    ButtonComponent,
    InputComponent,
],
  standalone: true,
})
export class ProfileComponent extends FormBuilderComponent implements OnInit {
  passForm: FormGroup;
  infoUser;
  isDefaultImg: boolean = false;
  @ViewChild('imageDevice') imageDevice: ElementRef;
 imageSrc = '/images/layout-section/user-profile.svg'; // مسیر تصویر پیش‌فرض
  constructor(
    protected notificationsService: NotificationsService,
    protected dialogService: DialogService,
    protected variablesService: VariablesService,
    protected baseApiService: BaseApiService,
    protected formBuilder: FormBuilder,
    private _localStorageService: LocalStorageService,
    private renderer: Renderer2,
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
    this.initPassForm();
  }

  ngOnInit(): void {
    this.infoUser = this._localStorageService.getUser();
    setTimeout(()=>{
      this.getProfile();
    },500)
    this.initForm();
    this.initPassForm();
    
  }

  initForm() {
    this.form = this.formBuilder.group({
      firstName: [
        this.findData ? this.findData.firstName : null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(45),
          this._extensions.noWhitespaceValidator(),
          this._extensions.noSpecialCharactersValidator(),
        ],
      ],
      lastName: [
        this.findData ? this.findData.lastName : null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(45),
          this._extensions.noWhitespaceValidator(),
          this._extensions.noSpecialCharactersValidator(),
        ],
      ],
      mobile: [
        this.findData ? this.findData.phoneNumber : null,
        // {
        //   value:this.infoUser ? this.infoUser.phoneNumber : null,
        //   disabled: true,
        // },
        [],
      ],
      email: [
        this.findData ? this.findData.email : null,
        [Validators.required],
      ],
      imageUrl: [this.findData ? this.findData.imageUrl : null],
    });
  }

  initPassForm() {
    this.passForm = this.formBuilder.group({
      currentPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      reapetPass: [null, [Validators.required]],
    });
  }

  getProfile() {
    this.callApi(
      this.baseApiService.GetApi('/Gateway/v1/api/Authentication/GetProfile')
    ).subscribe({
      next: (res) => {
        this.findData = res.result;
        this.seveInfo()
      },
      complete:() =>{
        this.initForm();
      }
    });
  }
   seveInfo(): void {
    this.infoUser.firstName = this.findData.firstName;
    this.infoUser.lastName = this.findData.lastName;
    this.infoUser.email = this.findData.email;
    this.infoUser.phoneNumber = this.findData.phoneNumber;
    this.infoUser.username = this.findData.username;
    this.infoUser.rolse = this.findData.rolse;

    this._localStorageService.saveUser(this.infoUser);
  }

  changePassword() {
    if (
      this.passForm.get('newPassword')?.value ==
      this.passForm.get('reapetPass')?.value
    ) {
      let body = {
        currentPassword: this.passForm.get('currentPassword')?.value,
        newPassword: this.passForm.get('newPassword')?.value,
      };

      this.callApiAndSubscribe(
        this.baseApiService.UpdateApi(
          '/Gateway/v1/api/Authentication/ChangePassword',
          body
        ),
        'update',
        'رمز عبور با موفقیت بروز رسانی شد',
        this.passForm
      );
    } else {
      this.notificationsService.errorToastr(
        'رمز عبور جدید با تکرار آن یکسان نیست'
      );
    }
  }

  protected actionAfterUpdate(): void {
    this.passForm.reset();
  }

  changeProfile() {
    let body = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email').value,
    };

    this.callApiAndSubscribe(
      this.baseApiService.UpdateApi(
        '/Gateway/v1/api/Authentication/UpdateProfile',
        body
      ),
      'callApi',
      'پروفایل شما با موفقیت بروز رسانی شد'
    );
  }

  actionAfterCallApi() {
    this.getProfile();
    this.variablesService.nameUser.set(this.form.get('firstName')?.value + ' ' + this.form.get('lastName')?.value)
  }

  onError(e) {
   this.renderer.setProperty(this.imageDevice.nativeElement,'src',this.imageSrc);
    this.isDefaultImg = true;
  }
}
