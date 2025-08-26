import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidatorsForm } from '../../../../tools/enums/validators-form.enum';


@Component({
  selector: 'input-validation-list',
  standalone:true,
  templateUrl: './input-validation-list.component.html',
  styleUrls: ['./input-validation-list.component.css'],
  imports: []
})
export class InputValidationListComponent implements OnInit {
  @Input() controlName: FormControl | any;
  @Input() hasTouched: boolean = false;
  public listErrors: Array<any> = [];
  constructor() {}
  ngOnInit() {
    this.getErrors(this.controlName);
    this.controlName.valueChanges.subscribe((newValue: any) => {
      this.getErrors(this.controlName);
    });
    
  }

  protected getErrors(control: FormControl) {
    this.listErrors = [];
    if (control.errors) {
      for (const key of Object.keys(control.errors)) {
        const validatorName = key as keyof typeof ValidatorsForm;
       
        switch (validatorName) {
          case 'required':
            this.listErrors.push({
              message: 'پر کردن فیلد الزامی است',
            });
            break;
          case 'minlength':
            this.listErrors.push({
              message: `حداقل تعداد کاراکتر ${control.errors[key].requiredLength}`,
            });
            break;
          case 'maxlength':
            this.listErrors.push({
              message: `حداکثر تعداد کاراکتر ${control.errors[key].requiredLength}`,
            });
            break;
          case 'min':
            this.listErrors.push({
              message: `حداقل مقدار مجاز ${control.errors[key].min}`,
            });
            break;
          case 'max':
            this.listErrors.push({
              message: `حداکثر مقدار مجاز ${control.errors[key].max}`,
            });
            break;

          case 'pattern':
            this.listErrors.push({
              message: 'مقدار وارد شده معتبر نیست',
            });
            break;
          case 'email':
            this.listErrors.push({
              message: 'ایمیل نامعتبر',
            });
            break;
            case 'incorrect':
            this.listErrors.push({
              message: control.errors[key],
            });
            break;

          case 'errorNationalCode':
            this.listErrors.push({
              message: control.errors[key],
            });
            break;
            
            case 'errorDate':
						this.listErrors.push({
							message: `${control.errors[key]}`,
						});
						break;
        }
       
      }
    }
  }
}
