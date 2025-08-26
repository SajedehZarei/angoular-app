import { Component, OnInit } from '@angular/core';

import { FormBuilderComponent } from '../../../components/class/form-builder.component';
import { NotificationsService } from '../../../services/app/notifications.service';
import { DialogService } from '@ngneat/dialog';
import { VariablesService } from '../../../services/app/variables.service';
import { FormBuilder } from '@angular/forms';
import { BaseApiService } from '../../../services/api/base-api.service';
import { InputComponent } from "../../../components/shared/input/input.component";
import { ButtonComponent } from "../../../components/shared/button/button.component";
import { NgSelectComponent } from "../../../components/shared/ng-select/ng-select.component";
import { TextareaComponent } from "../../../components/shared/textarea/textarea.component";
import { SwitchComponent } from "../../../components/shared/switch/switch.component";
import { LoadingPageComponent } from "../../../components/features/loading/loading-page/loading-page.component";
import { CheckBoxComponent } from "../../../components/shared/checkbox/checkbox.component";
import { DatePickerComponent } from "../../../components/shared/date-picker/date-picker.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [InputComponent, ButtonComponent, NgSelectComponent, TextareaComponent, SwitchComponent, LoadingPageComponent, CheckBoxComponent, DatePickerComponent],
})
export class HomeComponent extends FormBuilderComponent implements OnInit {
arrayValue: Array<{label:string,id:string}> = [
  {label:'مقدار1',id:'1'},
  {label:'مقدار2',id:'2'}
]

    constructor(
    protected notificationsService: NotificationsService,
    protected dialogService: DialogService,
    protected variablesService: VariablesService,
    protected baseApiService: BaseApiService,
    protected formBuilder: FormBuilder,
  ) {
    super(notificationsService,dialogService,variablesService,formBuilder,baseApiService);
    this.initForm()
  }

  ngOnInit(): void {}
  protected initForm(): void {
    this.form = this.formBuilder.group({
      input:[null,[]],
      select:[null,[]],
      checkBox:[null,[]],
      datePicker:[null,[]],
      switch:[null,[]],
      textarea:[null,[]],
    })
  }


  clickBtn(){
    console.log(this.form.value)
  }
}
