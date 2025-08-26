import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/app/local-storage.service';
import { BaseApiService } from '../../services/api/base-api.service';
const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refreshToken = localStorage.getItem('refreshToken');
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(
    private baseApiService: BaseApiService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = this.localStorageService.getToken();

    if (token != null) {
      request = this.addTokenHeader(request, token);
    }

    let headersConfig: any = {
      // 'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': 'fa',
      'client-Type': 'APP',
      // 'Username': userName.username,
    };

    if (request.body instanceof FormData) {
      headersConfig = {};
    }

    request = request.clone({
      setHeaders: { ...headersConfig },
    });
    // const accessToken = localStorage.getItem('accessToken')!;

    // if (accessToken) {
    //   request = request.clone({
    //     setHeaders: { Authorization: `Bearer ${accessToken}` },
    //   });
    // }

    if (request.urlWithParams.includes('TwoFactorLogin')) {
      request = request.clone({
        setHeaders: { Department: 'IOT' },
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          token
        ) {
          return this.handle401Error(request, next);
        } else if (error instanceof HttpErrorResponse && error.status === 500) {
          return throwError(
            'خطا در اتصال به سرور،لطفا چند دقیقه دیگر دوباره تلاش نمائید'
          );
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.localStorageService.getRefreshToken();

      if (!refreshToken) {
        this.localStorageService.signOut();
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
      }

      return this.baseApiService
        .GetApi(
          `/Gateway/v1/api/Authentication/Refresh?RefreshToken=${refreshToken!}`
        )
        .pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;

            let tokenRes = JSON.parse(JSON.stringify(token.result));

            this.localStorageService.saveToken(tokenRes['accessToken']);
            this.localStorageService.saveRefreshToken(tokenRes['refreshToken']);
            this.refreshTokenSubject.next(tokenRes['accessToken']);

            return next.handle(
              this.addTokenHeader(request, tokenRes['accessToken'])
            );
          }),
          catchError((err) => {
            this.isRefreshing = false;

            this.localStorageService.signOut();

            this.router.navigate(['']).then(() => {
              window.location.reload();
            });
            return throwError(err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    /* for Spring Boot back-end */
    return request.clone({
      headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
    });
  }
}
