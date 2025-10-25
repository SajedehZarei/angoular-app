import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { NotificationsService } from '../../../../../services/app/notifications.service';
import { VariablesService } from '../../../../../services/app/variables.service'; 
import { BaseApiService } from '../../../../../services/api/base-api.service';
import { ShareMethodsBaseComponent } from '../../../../../components/class/share-methods.component'; 
import { LoadingPageComponent } from '../../../../../components/features/loading/loading-page/loading-page.component'; 
import { ButtonComponent } from '../../../../../components/shared/button/button.component'; 
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';
import { differenceInCalendarDays } from 'date-fns';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'detailcomponent',
  standalone: true,
  imports: [LoadingPageComponent, ButtonComponent ,CommonModule,   ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [NotificationsService, DialogService, VariablesService, BaseApiService],
})
export class DetailComponent extends ShareMethodsBaseComponent implements OnInit {
   employee: any;
  showLoading = false;
  leaveForm!: FormGroup; 

  constructor(
    protected notificationsService: NotificationsService,
    protected dialogService: DialogService,
    protected variablesService: VariablesService,
    protected baseApiService: BaseApiService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder
  ) {
    super(notificationsService, dialogService, variablesService, baseApiService);
  }

ngOnInit(): void {
  this.leaveForm = this.fb.group({
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    leaveType: ['', Validators.required],
    hours: [{ value: '', disabled: true }, [Validators.min(1), Validators.max(24)]]
  });

  this.leaveForm.get('leaveType')?.valueChanges.subscribe((type) => {
    if (type === 'ساعتی') {
      // پایان = شروع
      const startDate = this.leaveForm.get('startDate')?.value;
      this.leaveForm.get('endDate')?.setValue(startDate);
      this.leaveForm.get('endDate')?.disable();

      // ساعت فعال
      this.leaveForm.get('hours')?.enable();
      this.leaveForm.get('hours')?.reset();
    } else {
      this.leaveForm.get('endDate')?.enable();
      this.updateHours(); // محاسبه خودکار ساعت
    }
  });
 this.leaveForm.get('startDate')?.valueChanges.subscribe((startDate) => {
    if (this.leaveForm.get('leaveType')?.value === 'ساعتی') {
      this.leaveForm.get('endDate')?.setValue(startDate);
    } else {
      this.updateHours();
    }
  });

  // وقتی تاریخ پایان تغییر کرد
  this.leaveForm.get('endDate')?.valueChanges.subscribe(() => this.updateHours());
}

    updateHours() {
  const type = this.leaveForm.get('leaveType')?.value;
  const start = this.leaveForm.get('startDate')?.value;
  const end = this.leaveForm.get('endDate')?.value;

  if (!start || !end) return;

  if (type === 'روزانه' || type === 'درون‌شهری' || type === 'برون‌شهری') {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = differenceInCalendarDays(endDate, startDate) + 1;
    this.leaveForm.patchValue({ hours: days * 9 });
    this.leaveForm.get('hours')?.disable();
  } else if (type === 'ساعتی') {
    this.leaveForm.get('hours')?.enable();
    this.leaveForm.get('hours')?.reset();
  }
}


    onSubmit() {
    if (this.leaveForm.valid) {
      console.log('Form submitted:', this.leaveForm.value);
    this.notificationsService.successToastr('موفقیت', 'فرم با موفقیت ارسال شد.');
    } else {
     this.notificationsService.errorToastr('خطا', 'لطفاً تمام فیلدها را پر کنید.');
    }
  }

  returnbBackPage() {
    this._router.navigate(['/dashboard/category-management/category']);
  }
}
