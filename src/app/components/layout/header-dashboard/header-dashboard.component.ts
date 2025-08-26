import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router, RouterLink} from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { NgClass } from '@angular/common';
import { ShareMethodsBaseComponent } from '../../class/share-methods.component';
import { NotificationsService } from '../../../services/app/notifications.service';
import { VariablesService } from '../../../services/app/variables.service';
import { LocalStorageService } from '../../../services/app/local-storage.service';
import { BaseApiService } from '../../../services/api/base-api.service';
import { SidebarDashboardComponent } from "../sidebar-dashboard/sidebar-dashboard.component";
import { filter, Subscription } from 'rxjs';
import { Breadcrumb } from '../../../models/app/breadcrumb.model';


@Component({
  selector: 'app-header-dashboard',
  standalone: true,
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.css'],
  imports: [NgClass, RouterLink, SidebarDashboardComponent]
})
export class HeaderDashboardComponent extends ShareMethodsBaseComponent implements OnInit {
  titleHeader: string;
  infoUser;
  showIconBack: boolean = true;

  backMenu: boolean = false;
  showMenu: boolean = false;
  breadcrumbs: Breadcrumb[] = [];
  queryParamsSubscription: Subscription;
  
  constructor(
    protected notificationsService: NotificationsService,
    protected dialogService: DialogService,
    protected variablesService: VariablesService,
    protected baseApiService: BaseApiService,
    protected localStorage: LocalStorageService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    super(notificationsService, dialogService, variablesService,baseApiService);
  }

  ngOnInit(): void {
    this.infoUser = this.localStorage.getUser();
    
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showBreadcrumbs();
      });

    this.showBreadcrumbs();

    // switch (true) {
    //   case this._router.url === '/dashboard':
    //     this.titleHeader = 'داشبورد';
    //     this.showIconBack = false;
    //     break;
    //   case this._router.url.includes('/dashboard/active-devices'):
    //     this.titleHeader = 'دستگاه‌های فعال';
    //     this.showIconBack = true;
    //     break;
    //   case this._router.url.includes('/dashboard/error-devices'):
    //     this.titleHeader = 'دستگاه‌های دارای خطا';
    //     this.showIconBack = true;
    //     break;
    //   case this._router.url.includes('/dashboard/profile'):
    //     this.titleHeader = 'پروفایل';
    //     this.showIconBack = true;
    //     break;
    //   case this._router.url.includes('/dashboard/error-list-device'):
    //     this.titleHeader = 'تاریخچه خطای دستگاه';
    //     this.showIconBack = true;
    //     break;
    //   case this._router.url.includes('/dashboard/error-list-model'):
    //     this.titleHeader = 'خطاها بر اساس مدل';
    //     this.showIconBack = true;
    //     break;
    //   case this._router.url.includes('/dashboard/provinces-error'):
    //     this.titleHeader = '  خطاها بر اساس استان ';
    //     this.showIconBack = true;
    //     break;
    //   case this._router.url.includes('/dashboard/cities-error'):
    //     this.titleHeader = '  خطاها بر اساس شهر ';
    //     this.showIconBack = true;
    //     break;
    //   case this._router.url.includes('/dashboard/installation-report'):
    //     this.titleHeader = 'گزارش نصب ماهانه';
    //     this.showIconBack = true;
    //     break;
    //   case this._router.url.includes('/dashboard/monitoring'):
    //     this.titleHeader = 'مانیتورینگ';
    //     this.showIconBack = true;
    //     break;
    //   case this._router.url.includes('/dashboard/production-report'):
    //     this.titleHeader = 'گزارش تولیدات';
    //     this.showIconBack = true;
    //     break;
    // }
  }

  showBreadcrumbs() {
    // اول بررسی queryParams
    this.queryParamsSubscription = this._activatedRoute.queryParams.subscribe(
      (params) => {
        // this.fromNamespace = params['paramSelect']
        //   ? params['paramSelect']
        //   : this._activatedRoute.snapshot.paramMap.get('namespace')!;
        // this.fromNameTable = this._activatedRoute.snapshot.paramMap.get('name')!;
        // this.fromKey = this._activatedRoute.snapshot.paramMap.get('key')!;

        // ساخت اولیه breadcrumb
        this.breadcrumbs = this.createBreadcrumbs(this._activatedRoute.root);
        this.breadcrumbs = this.breadcrumbs.filter(
          (value, index, self) =>
            index === self.findIndex((item) => item.label === value.label)
        );
        // اگر از فضای نام اومده بودی، دستی breadcrumb اول رو اضافه کن
      }
    );
    this.titleHeader = this.breadcrumbs[this.breadcrumbs.length-1].label
    // if (this.fromNamespace) {
    //   this.breadcrumbs.splice(1, 0, {
    //     label: this.fromNamespace,
    //     url: `/dashboard/namespaces/${this.fromNamespace}/tables`,
    //     queryParams: { paramSelect: this.fromNamespace },
    //   });
     
    // }

    // if (this.fromNameTable) {
    //   this.breadcrumbs.splice(3, 0, {
    //     label: this.fromNameTable,
    //     url: `/dashboard/namespaces/${this.fromNamespace}/tables/detail/rows/${this.fromNameTable}`,
    //   });
      
    // }

    // if (this.fromKey) {
    //   this.breadcrumbs.splice(this.breadcrumbs.length - 1, 0, {
    //     label: this.fromKey,
    //     url: `/dashboard/namespaces/${this.fromNamespace}/tables/detail/rows/${this.fromNameTable}/${this.fromKey}`,
    //   });
      
    // }

  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    for (let child of children) {
      if (child.outlet !== PRIMARY_OUTLET) continue;

      const routeSnapshot = child.snapshot;

      const routeURL = routeSnapshot?.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = routeSnapshot?.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      // اگر از فضای نام اومده بودی، دستی breadcrumb اول رو اضافه کن

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }


  openMenu() {
    this.backMenu = true;
    setTimeout(() => {
      this.showMenu = true;
    }, 100);
  }

  closeMenu() {
    this.backMenu = false;
    this.showMenu = false;
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




  ngOnDestroy() {
    
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }



}
