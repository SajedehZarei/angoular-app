import { Routes } from '@angular/router';
import { authRoutes } from './routes/auth.routes';
import { dashboardRoutes } from './routes/dashboard.routes';

export const routes: Routes = [
    ...authRoutes,
    ...dashboardRoutes,  

  {
    path: '**',
    redirectTo: '/sign-in',
    // redirectTo: '',
  },
];
