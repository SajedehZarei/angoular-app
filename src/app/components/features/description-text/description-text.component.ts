import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-description-text',
  standalone: true,
  styleUrls: ['./description-text.component.css'],
  templateUrl: './description-text.component.html',
  imports: [ButtonComponent],
})
export class DescriptionTextComponent implements OnInit {
  @Input() text: string;
  @Input() textBtn: string = '';
  @Input() typeBtn: string = 'blue-pmy-btn';
  @Input() status: string;

  @Output() public onClickBtn = new EventEmitter<any>();

  constructor() {}
  ngOnInit(): void {}

  public clickBtn() {
    this.onClickBtn.emit();
  }
}
