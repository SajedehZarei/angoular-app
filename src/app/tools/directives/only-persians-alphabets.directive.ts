import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[onlyPersiansAlphabets]',
  standalone: true
})
export class OnlyPersiansAlphabets {
  @Input('formControl') formControl: FormGroup;

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {

    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^, ,ؤ,ئ,ي,إ,أ,آ,ة,ظ,ط,ز,ژ,ر,ذ,د,و,ش,س,ی,ب,ل,ت,ن,م,ک,گ,ض,ص,ث,ق,ق,ف,غ,ع,ه,خ,ح,ج,چ,ت,پ,ب,ا,]*/g,'');
    if(this.formControl)
    this.formControl.setValue(this._el.nativeElement.value);
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
      alert("در فیلد مربوطه فقط کاراکترهای حروف فارسی مجاز است")
    }

  }
}

