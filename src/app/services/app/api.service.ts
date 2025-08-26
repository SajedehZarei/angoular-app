import { HttpClient, HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiResponse } from '../../models/api/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  observer: Observable<ApiResponse<any>>;

  callService<T>(
    type: string,
    path: string,
    body: object | number,
    responseType = {}
  ): Observable<ApiResponse<T>> {
    switch (type) {
      case 'get':
        return this.get<ApiResponse<T>>(path, body);
        break;

      case 'put':
        return this.put<ApiResponse<T>>(path, body);
        break;

      case 'post':
        return this.post<ApiResponse<T>>(path, body, responseType);
        break;
      case 'delete':
        return this.delete(path);
        break;

      default:
        return this.observer;
    }
  }

  get<T>(
    path: string,
    params = {},
    baseUrl?
  ): Observable<T> {
    return this.http.get<T>(`${baseUrl}${path}`, {
      params,
    });
  }

  put<T>(
    path: string,
    body = {},
    baseUrl?
  ): Observable<T> {
    return this.http.put<T>(
      `${baseUrl}${path}`,
      // JSON.stringify(body)
      body
    );
  }

  post<T>(
    path: string,
    body,
    responseType = {},
    baseUrl?
  ): Observable<T> {
    return this.http.post<T>(`${baseUrl}${path}`, body, responseType);
  }

  public postFileData<T>(
    path: string,
    body: FormData,
    baseUrl
  ): Observable<HttpEvent<T>> {
    return this.http.post<T>(`${baseUrl}${path}`, body, {
      reportProgress: true,
      observe: 'events',
    });
  }

  delete(
    path: any,
    options = {},
    baseUrl?
  ): Observable<any> {
    // const httpParams = new HttpParams();
    // httpParams.set(
    //   'Access-Control-Allow-Methods',
    //   'GET, POST, OPTIONS, DELETE'
    // );
    return this.http.delete(`${baseUrl}${path}`);
  }
}
