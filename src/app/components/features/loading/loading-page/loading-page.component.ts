import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-page',
  standalone: true,
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css'],
  imports:[NgClass]
})
export class LoadingPageComponent implements OnInit {
  @Input() typeLoading = 'screen'
  constructor() {}

  ngOnInit() {}
}
