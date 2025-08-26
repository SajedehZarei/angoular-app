import { Component, Input } from '@angular/core';

@Component({
  selector: 'title-page',
  standalone: true,
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.css'],
})
export class TitlePageComponent {
  @Input() title: string;
  constructor() {}
}
