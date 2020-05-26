import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { take, retry, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

const baseUrl = environment.base_api_url;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8',
    'Response-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*.*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  addHeader(key, value): void {
    var httpHeaders = httpOptions.headers;
    httpHeaders = httpHeaders.append(key, value);
    httpOptions.headers = httpHeaders;
  }

  combineHeaders(newHeaders: HttpHeaders): void {
    var httpHeaders = httpOptions.headers;
    for (let key of newHeaders.keys()) {
      if (!httpHeaders.has(key) && newHeaders.get(key) != 'need-delete') {
        httpHeaders = httpHeaders.append(key, newHeaders.get(key));
      } else {
        if (newHeaders.get(key) == 'need-delete') {
          httpHeaders = httpHeaders.delete(key);
        } else {
          httpHeaders = httpHeaders.set(key, newHeaders.get(key));
        }
      }
    }
    httpOptions.headers = httpHeaders;
  }

  /**
  * GET method for all the api call
  * @param url
  * @param variable - pass null if don't need
  * @param [showLoading = true]
  */
  get<T>(url: string, showLoading = true): Observable<T | any> {
    if (showLoading) {
      //this.coreUiService.showLoadingContent();
    }

    return this.http.get<T>(baseUrl + url, httpOptions)
      .pipe(
        take(1),
        retry(1),
        tap(
          result => {
            //this.coreUiService.hideLoadingContent();
          },
          err => {
            //this.coreUiService.hideLoadingContent();
          }
        )

      );
  }

  /**
  * POST method for all the api call
  * @param url
  * @param data - data to be posted
  * @param name
  */
  post<T>(url: string, data: object, showLoading = true): Observable<T | any> {
    if (showLoading) {
      //this.coreUiService.showLoadingContent();
    }
    return this.http.post<T>(baseUrl + url, data, httpOptions).pipe(
      tap(
        result => {
          //this.coreUiService.hideLoadingContent();
        },
        err => {
          //this.coreUiService.hideLoadingContent();
        }
      )
    );
  }

  /**
  * Handle Http operation that failed.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation: string, result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {

      if (error.error && error.error.message) {
        console.error(error.error.message);
      } else {
        console.error('Can Not Load Data For', operation);
      }

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }

  getWithDownloadFile<T>(url: string, showLoading = true) {
    if (showLoading) {
      //this.coreUiService.showLoadingContent();
    }
    var options = {};
    Object.assign(options, httpOptions);
    options['responseType'] = 'blob';
    options['observe'] = 'response';
    return this.http.get(baseUrl + url, options).pipe(
      tap(
        result => {
          //this.coreUiService.hideLoadingContent();
        },
        err => {
          //this.coreUiService.hideLoadingContent();
        }
      )
    );
  }

}
