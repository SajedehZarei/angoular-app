  
  
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormBuilderComponent } from '../../class/form-builder.component';
import { NotificationsService } from '../../../services/app/notifications.service';
import { VariablesService } from '../../../services/app/variables.service';
import { LocalStorageService } from '../../../services/app/local-storage.service';
import { BaseApiService } from '../../../services/api/base-api.service';


@Component({
  selector: 'app-sidebar-dashboard',
  standalone: true,
  templateUrl: './sidebar-dashboard.component.html',
  styleUrls: ['./sidebar-dashboard.component.css'],
  imports: [RouterLink, RouterLinkActive, CommonModule],
})
export class SidebarDashboardComponent
  extends FormBuilderComponent
  implements OnInit
{
  infoUser;
   menus = [
    {
      title: 'لیست کارمندان',
      route: '/dashboard/category-management/category',
      isOpen: false,
      icon: 'las la-columns',
      subMenus: [],
    },
    {
      title: 'مدیریت دسته بندی',
      route: '',
      isOpen: false,
      icon: 'las la-desktop',
      subMenus: [
        {
          title: 'دسته بندی ها',
          route: '/dashboard/management-category/category',
        },
        //  {
        //   title: ' نوع زیر دسته بندی',
        //   route: '/dashboard/management-category/sub-category-type',
        // },
        // {
        //   title: ' زیر دسته بندی',
        //   route: '/dashboard/management-category/sub-category',
        // },
       
        
      ],
    },
   ]

  constructor(
    protected notificationsService: NotificationsService,
    protected dialogService: DialogService,
    protected variablesService: VariablesService,
    protected baseApiService: BaseApiService,
    protected formBuilder: FormBuilder,
    private _router: Router,
    private localStorage: LocalStorageService
  ) {
    super(notificationsService, dialogService, variablesService, formBuilder,baseApiService);
  }

  ngOnInit(): void {
    this.infoUser = this.localStorage.getUser()!;
  }

  logOut() {
    this.callQuestionDialog(
      null,
      'خروج از سایت',
      'برای خروج از سایت مطمئن هستید؟'
    );
  }
  protected actionAfterAcceptQuestion(value?: any): void {
    this.localStorage.clear()
    this._router.navigate(['/sign-in']);
  }

    isActive(menu): boolean {
    return this._router.url.startsWith(menu.route);
  }

  isSubmenuActive(menu: any): boolean {
    return menu.subMenus?.some((sub: any) =>
      this._router.url.startsWith(sub.route)
    );
  }

    toggleSubMenu(menu: any) {
    if (menu.isOpen) {
      menu.isOpen = false;
    } else {
      this.menus.forEach((item) => {
        if (item.title == menu.title) {
          item.isOpen = true;
        } else {
          item.isOpen = false;
        }
      });
    }
  }

}
