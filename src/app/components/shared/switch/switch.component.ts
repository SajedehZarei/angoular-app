
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-switch',
  standalone: true,
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  imports: [ReactiveFormsModule],
})
export class SwitchComponent implements OnInit {
  @Input() idCustom: string = '';
  @Input() text: string = '';
  @Input() isDisabled: boolean = false;
  @Input() isChecked: boolean = false;
  @Input() controlName: FormControl = new FormControl(null, []);
  @Output() changeValue = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  changeDanger(event) {
    this.changeValue.emit(event.target.checked);
  }
}
