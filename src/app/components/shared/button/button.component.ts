import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Location, NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [NgClass],
})
export class ButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() customClass: string = '';
  @Input() icon: string = '';
  @Input() id: string = '';
  @Input() type: string = 'button';
  @Input() typeBtn: string = 'style-btn';
  @Input() value: string = '';
  @Input() isDisabled: boolean = false;
  @Input() activeReturnUrl: boolean = false;
  @Output() onClicked = new EventEmitter<any>();
  constructor(private _location: Location) {}

  ngOnInit() {}

  onClick(event: any) {
    if (this.activeReturnUrl) {
      this._location.back();
    } else {
      this.onClicked.emit(event);
    }
  }
}
