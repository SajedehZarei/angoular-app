import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import * as jMoment_ from 'moment-jalaali';
import { InputValidationListComponent } from '../input/input-validation-list/input-validation-list.component';
import { LabelComponent } from '../label/label.component';
import { NgPersianDatepickerComponent } from '../../features/date-picker/ng-persian-datepicker.component';
import { defaultTheme } from '../../features/date-picker/theme/default.theme';
import { IDatepickerTheme } from '../../features/date-picker/interface/IDatepickerTheme';
import { NgClass } from '@angular/common';

const jMoment = jMoment_;
@Component({
  selector: 'app-date-picker',
  standalone: true,
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  imports: [
    LabelComponent,
    InputValidationListComponent,
    FormsModule,
    NgPersianDatepickerComponent,
    NgClass
  ],
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input() textLabel: string = '';
  @Input() classCustomLabel: string = '';
  @Input() isValidation: boolean = true;
  @Input() placeholder: string = 'انتخاب کنید';
  @Input() icon: string = 'fas fa-calendar';
  @Input() controlName: FormControl | any;
  @Input() customClass: string = '';
  @Input() dateMin: number;
  @Input() dateMax: number;
  @Output() selectedDateGregorian = new EventEmitter<any>();
  uiTheme: IDatepickerTheme = defaultTheme;
  UiFormControl = new FormControl(null, []) as any;
  isView: boolean = false;
  isActivetouched: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateMax'] || changes['dateMin']) {
      this.UiFormControl.setValue(this.controlName.value);
      this.selectedDateGregorian.emit();
    }
  }
  changeValue(event): void {
    this.controlName.setValue(event.target.value);
  }

  ngAfterContentChecked() {
    if (this.controlName.value === null) this.UiFormControl.reset();
  }
  ngOnInit() {
    if (this.controlName.value) {
      this.UiFormControl.setValue(this.controlName.value);
    }
    this.selectedDateGregorian.emit();
  }

  actionsShowContent() {
    this.isView = !this.isView;
  }

  onSelect(event) {
    // this.controlName.setValue(event.gregorian);
    this.controlName.setValue(event.shamsi);
    this.UiFormControl.setValue(event.shamsi);
    this.selectedDateGregorian.emit(event);
  }

  istouched(event) {
    this.isActivetouched = true;
  }

   resetDate(){
    this.controlName.reset();
  }
}
