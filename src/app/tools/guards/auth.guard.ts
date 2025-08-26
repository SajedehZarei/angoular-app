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
export class AuthGuard {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    
    if (state.url != '/sign-in') {
      if (typeof window !== 'undefined') {
        if (this.localStorage.getUser() || (this.localStorage.getUser() ||
        this.localStorage.getPhoneNumber())) {
        return true;
      } else {
        this.router.navigate(['./sign-in']);
        return false;
      }
      } else {
        return false;
      }
    } else {
      return true;
    }
    
    // this.router.navigate(['./sign-in'], {
    //   queryParams: { redirect: state.url },
    //   replaceUrl: true,
    // });
  }
}
