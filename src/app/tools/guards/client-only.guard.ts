import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class ClientOnlyGuard {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    
    if (isPlatformBrowser(this.platformId)) {
      return true;  // اجازه دسترسی
    } else {
      return false; // اجازه دسترسی ندارد
    }

   
  }
}
