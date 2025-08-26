import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  imports: [LabelComponent, ReactiveFormsModule],
})
export class CheckBoxComponent implements OnInit {
  @Input() textLabel: string = '';
  @Input() classCustomLabel: string = 'text-black inline-block';
  @Input() id: string | number = '';
  @Input() controlName: FormControl = new FormControl(null, []);;
  @Input() name: string = '';
  @Input() value: string | number = '';
  @Input() isDisabled: boolean = false;
  @Input() isChecked: boolean = false;
  @Input() ngModelBind: boolean = false;
  @Input() hasClass: string | null = null;

  @Output() changeSelected = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onChangeSelected(event: any) {
    this.changeSelected.emit(event);
  }
}
