import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content-dashboard',
  standalone: true,
  templateUrl: './content-dashboard.component.html',
  styleUrls: ['./content-dashboard.component.css'],
  imports: [RouterOutlet],
})
export class ContentDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
