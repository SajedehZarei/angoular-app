import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { NotificationsService } from '../../../../../services/app/notifications.service';
import { VariablesService } from '../../../../../services/app/variables.service'; 
import { BaseApiService } from '../../../../../services/api/base-api.service';
import { ShareMethodsBaseComponent } from '../../../../../components/class/share-methods.component'; 
import { LoadingPageComponent } from '../../../../../components/features/loading/loading-page/loading-page.component'; 
import { ButtonComponent } from '../../../../../components/shared/button/button.component'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'detailcomponent',
  standalone: true,
  imports: [LoadingPageComponent, ButtonComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [NotificationsService, DialogService, VariablesService, BaseApiService],
})
export class DetailComponent extends ShareMethodsBaseComponent implements OnInit {
  employee: any;
  showLoading = false;

  
  @ViewChild('leaveTypeSelect') leaveTypeSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('hourSection') hourSection!: ElementRef<HTMLDivElement>;

  constructor(
    protected notificationsService: NotificationsService,
    protected dialogService: DialogService,
    protected variablesService: VariablesService,
    protected baseApiService: BaseApiService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    super(notificationsService, dialogService, variablesService, baseApiService);
  }

  ngOnInit(): void {
    this.employee = {
      id: 1,
      fullName: 'سجاد احمدی',
      personnelCode: '12345',
    };
  }

  ngAfterViewInit() {

    this.hourSection.nativeElement.style.display = 'none';

   
    this.leaveTypeSelect.nativeElement.addEventListener('change', () => {
      if (this.leaveTypeSelect.nativeElement.value === 'ساعتی') {
        this.hourSection.nativeElement.style.display = 'block';
      } else {
        this.hourSection.nativeElement.style.display = 'none';
      }
    });
  }

  returnbBackPage() {
    this._router.navigate(['/dashboard/category-management/category']);
  }
}
