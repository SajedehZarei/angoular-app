import { Routes } from '@angular/router';
import { AuthGuard } from '../tools/guards/auth.guard';

export const authRoutes: Routes = [
  {
    path: 'sign-in',
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivate: [AuthGuard],
        loadComponent: () =>
          import('../pages/auth/sign-in/sign-in.component').then(
            (m) => m.SignInComponent
          ),
      },

      {
        path: 'verify-code-login',
        // canActivate: [AuthGuard],
        data: { typeCode: 'login' },
        loadComponent: () =>
          import('../pages/auth/verify-code/verify-code.component').then(
            (m) => m.VerifyCodeComponent
          ),
      },

      {
        path: 'verify-code-change-password',
        // canActivate: [AuthGuard],
        data: { typeCode: 'changePassword' },
        loadComponent: () =>
          import('../pages/auth/verify-code/verify-code.component').then(
            (m) => m.VerifyCodeComponent
          ),
      },

      {
        path: 'change-password',
        // canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            '../pages/auth/change-password/change-password.component'
          ).then((m) => m.ChangePasswordComponent),
      },
    ],
  },
];
