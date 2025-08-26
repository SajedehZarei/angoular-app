import { InjectionToken } from "@angular/core";

export interface AppEnvironment {
  production: boolean;
  APIEndpoint: string;
  // هر چیزی دیگه‌ای که داری
}
export const APP_ENV = new InjectionToken<AppEnvironment>('APP_ENV');
export const environment = {
  production: true,
  APIEndpoint: 'https://api.example.com',
};