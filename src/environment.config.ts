import { InjectionToken } from "@angular/core";

export interface AppEnvironment {
  production: boolean;
  APIEndpoint: string;
  APIEndpointMarket: string;
  // هر چیزی دیگه‌ای که داری
}
export const APP_ENV = new InjectionToken<AppEnvironment>('APP_ENV');
export const environment: AppEnvironment = {
  production: false,
  APIEndpoint: 'http://192.168.1.166:1010',
  APIEndpointMarket: 'http://10.0.91.15:9013/api',
};