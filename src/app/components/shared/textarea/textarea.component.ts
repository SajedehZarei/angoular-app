import { Component, OnInit, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from '../label/label.component';
import { InputValidationListComponent } from '../input/input-validation-list/input-validation-list.component';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-textarea',
	standalone: true,
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss'],
	imports: [
		LabelComponent,
		ReactiveFormsModule,
		InputValidationListComponent,
		NgClass
	  ],
})
export class TextareaComponent implements OnInit {
	@Input() textLabel: string ;
	@Input() classCustomLabel: string = '';
	@Input() customClass: string = '';
	@Input() placeholder: string = 'تایپ کنید';
	@Input() maxlength: number ;
	@Input() minlength: number = 0;
	@Input() rows: number = 3;
	@Input() controlName: FormControl | any;
	@Input() hasValidation: boolean = true;
	@Input() readOnly: boolean = false;
	@Input() disable: boolean = false;

	constructor() {}

	ngOnInit() {}
}
