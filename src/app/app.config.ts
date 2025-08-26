import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { environment, AppEnvironment, APP_ENV } from '../environment.config';
import { provideToastr } from 'ngx-toastr';
import { Extensions } from './tools/extensions';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './tools/interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
   { provide: APP_ENV, useValue: environment },
    provideToastr({ preventDuplicates: true }),
    Extensions,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule)
  ],
};


