import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputValidationListComponent } from '../input-validation-list/input-validation-list.component';
import { LabelComponent } from '../../label/label.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-only-number-input',
  standalone: true,
  templateUrl: './only-number-input.component.html',
  styleUrls: ['./only-number-input.component.css'],
  imports: [
    LabelComponent,
    ReactiveFormsModule,
    InputValidationListComponent,
    NgClass
  ],
})
export class OnlyNumberInputComponent implements OnInit {
  @ViewChild('inputForm', { static: true }) inputForm: ElementRef;
  showPassword: boolean = false;

  @Input() textLabel: string = '';
  @Input() classCustomLabel: string = '';
  @Input() customClass: string = '';
  @Input() customClassIcon: string = '';
  @Input() placeholder: string = 'تایپ کنید';
  @Input() typeValue: string = 'text';
  @Input() maxlength: number = 50;
  @Input() minlength: number = 0;
  @Input() controlName: FormControl | any;
  @Input() slashAndStarAllowed: boolean = false;
  @Input() hasValidation: boolean = true;
  @Input() readOnly: boolean = false;
  @Input() isDisabled: boolean = false;

  @Output() keyUpInput = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onkeyUpInput(event: any) {
    this.keyUpInput.emit(event);
  }
  showPass() {
    this.inputForm.nativeElement.type =
      this.inputForm.nativeElement.type == 'text' ? 'password' : 'text';
    this.showPassword = !this.showPassword;
  }
}
