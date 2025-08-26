import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from '../../services/app/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (typeof window !== 'undefined') {
      if (this.localStorage.getToken()) {
        return true;
      } else {
        this.router.navigate(['./sign-in'], {
          queryParams: { redirect: state.url },
          replaceUrl: true,
        });
        return false;
      }
    } else {
      return false;
    }
  }
}
