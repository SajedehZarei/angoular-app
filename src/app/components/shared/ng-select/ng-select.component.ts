import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { InputValidationListComponent } from '../input/input-validation-list/input-validation-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LabelComponent } from '../label/label.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-ng-select',
  standalone: true,
  templateUrl: './ng-select.component.html',
  styleUrls: ['./ng-select.component.css'],
  imports: [LabelComponent,InputValidationListComponent,NgSelectModule,ReactiveFormsModule,AsyncPipe]
})
export class NgSelectComponent implements OnInit {
  @Input() textLabel: string = '';
  @Input() classCustomLabel: string = '';
  @Input() customClass: string = '';
  @Input() placeholder: string = 'انتخاب کنید';
  @Input('itemsValue') itemsValue$: any;
  @Input('itemsArray') itemsArray: any;
  @Input() bindLabel: string = '';
  @Input() bindValue: string = '';
  @Input() controlName: FormControl | any = new FormControl();
  @Input() multiple: boolean = false;
  @Input() hasValidation: boolean = true;
  @Input() border: boolean | any = true;
  @Input() hasLoding: boolean = false;

  @Input() markFirst: boolean = false;
  @Input() typeToSearchText: string = 'برای جستجو حداقل 3 حرف وارد کنید';
  @Input() notFoundText: string = 'موردی یافت نشد';
  @Input() loadingText: string = 'در حال جستجو...';
  @Input() clearAllText: string = '';
  @Input() appendTo: string = '';
  @Input() maxSelectedItems: number = 10;
  @Input() searchFn: any;
  @Input() readonly: boolean = false;
  @Input() selectOnTab: boolean = false;
  @Input() openOnEnter: boolean = true;
  @Input() virtualScroll: boolean = false;
  @Input() clearable: boolean = true;
  @Input() closeOnSelect: boolean = true;
  @Input() hideSelected: boolean = false;
  @Input() minTermLength: number = 0;
  @Input() typeahead$ = new Subject<any>();

  @Output() changeValue = new EventEmitter<any>();
  @Output() clearValue = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onChangeValue(event: any) {
    this.changeValue.emit(event);
  }

  onClearValue(event: any) {
    this.controlName.reset();
    this.clearValue.emit(event);
  }
}
