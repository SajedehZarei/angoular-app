import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../app/api.service';
import { ApiResponse } from '../../models/api/api-response.model';
import { APP_ENV } from '../../../environment.config';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
 private env = inject(APP_ENV);

  constructor(private api: ApiService) {}

  PostApi<T>(address: string, body: object,baseUrl: string = this.env.APIEndpoint): Observable<ApiResponse<T>> {
    return this.api.post<ApiResponse<T>>(address, body ,{},baseUrl);
  }

  GetApi<T>(address: string,baseUrl: string = this.env.APIEndpoint): Observable<ApiResponse<T>> {
    return this.api.get<ApiResponse<T>>(address,{},baseUrl);
  }

  UpdateApi<T>(address: string, body: object,baseUrl: string = this.env.APIEndpoint): Observable<ApiResponse<T>> {
    return this.api.put<ApiResponse<T>>(address, body, baseUrl);
  }

  DestroyApi<T>(address: string,baseUrl: string = this.env.APIEndpoint): Observable<ApiResponse<T>> {
    return this.api.delete(address,{},baseUrl);
  }
}
