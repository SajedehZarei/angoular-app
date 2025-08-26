import { Component, OnInit } from '@angular/core';
import { HeaderDashboardComponent } from './header-dashboard/header-dashboard.component';
import { ContentDashboardComponent } from './content-dashboard/content-dashboard.component';
import { FooterDashboardComponent } from './footer-dashboard/footer-dashboard.component';
import {SidebarDashboardComponent} from "./sidebar-dashboard/sidebar-dashboard.component";

@Component({
  selector: 'app-layout-dashboard',
  standalone: true,
  templateUrl: './layout-dashboard.component.html',
  styleUrls: ['./layout-dashboard.component.css'],
  imports: [ContentDashboardComponent, FooterDashboardComponent, SidebarDashboardComponent,HeaderDashboardComponent]
})
export class LayoutDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
