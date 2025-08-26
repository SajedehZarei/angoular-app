import {
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { FormGroup} from '@angular/forms';

@Directive({
  selector: 'input[onlyNumbers]',
  standalone: true
})
export class OnlyNumbersDirective {
  @Input('formControl') formControl: FormGroup;
  @Input() parkingCount:boolean = false;

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {

    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0123456789۱۲۳۴۵۶۷۸۹۰]*/g,'');

    if(this.parkingCount){
      var Value = +this._el.nativeElement.value ;
      if(Value < 0 || Value > 255)
      this._el.nativeElement.value = '';
    
    }
    if(this.formControl)
    this.formControl.setValue(this._el.nativeElement.value);
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
      alert("در فیلد مربوطه فقط کاراکترهای عددی مجاز است")
    }

  }

}
