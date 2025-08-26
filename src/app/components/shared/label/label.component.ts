import { NgClass } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  standalone: true,
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css'],
  imports: [NgClass],
})
export class LabelComponent implements OnInit {
  @Input() textLabel: string = 'عنوان';
  @Input() customClassLabel: string = '';
  @Input() forLabel: string | any = '';
  @Input() isRequired: boolean = false;

  constructor() {}

  ngOnInit() {}
}
