import { Routes } from '@angular/router';
import { DashboardGuard } from '../tools/guards/dashboard.guard';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    // canActivate: [DashboardGuard],
    loadComponent: () =>
      import('../components/layout/layout-dashboard.component').then(
        (m) => m.LayoutDashboardComponent
      ),
    children: [
      {
        path: 'home',
        data: { breadcrumb: 'داشبورد' },
        loadComponent: () =>
          import('../pages/dashboard/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },

      {
        path: 'management-category',
        data: { breadcrumb: 'مدیریت دسته بندی' },
        children: [
          {
            path: 'category',
            data: { breadcrumb: '  دسته بندی' },
            loadComponent: () =>
              import(
                '../pages/dashboard/category-management/category/category.component'
              ).then((m) => m.CategoryComponent),
          },
              {
                path: 'category-form',
                data: { breadcrumb: '  فرم ایجاد دسته بندی' },
                loadComponent: () =>
                  import('../pages/dashboard/category-management/category/form/category-form.component').then(
                    (m) => m.CategoryFormComponent
                  ),
              },
              {
                path: 'category-form/:id',
                data: { breadcrumb: '  فرم ویرایش دسته بندی' },
                loadComponent: () =>
                  import('../pages/dashboard/category-management/category/form/category-form.component').then(
                    (m) => m.CategoryFormComponent
                  ),
              },
            
          
          {
            path: 'sub-category-type',
            data: { breadcrumb: 'نوع زیر دسته بندی' },
            loadComponent: () =>
              import('../pages/dashboard/profile/profile.component').then(
                (m) => m.ProfileComponent
              ),
          },
          {
            path: 'sub-category',
            data: { breadcrumb: 'زیر دسته بندی' },
            loadComponent: () =>
              import('../pages/dashboard/profile/profile.component').then(
                (m) => m.ProfileComponent
              ),
          },
        ],
      },

      {
        path: 'profile',
        data: { breadcrumb: 'پروفایل' },
        loadComponent: () =>
          import('../pages/dashboard/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },

      {
    path: '**',
    redirectTo: 'home',
    // redirectTo: '',
  },
    ],
    
  },

  
];
