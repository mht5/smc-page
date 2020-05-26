import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DisplayService } from 'src/app/core/services/display.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  msg: string[];

  constructor(private displayService: DisplayService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          let errorMessage = '';
          errorMessage = error['error']['message'];
          return this.processError(errorMessage);
          /* if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
            return this.processError(errorMessage);
          } else if (error.error instanceof Blob) {
            var reader = new FileReader();
            reader.onload = e => {
              errorMessage = JSON.parse(e.target['result'])['errMsg'];
              return this.processError(errorMessage);
            }
            reader.readAsText(error.error);
          } else {
            // server-side error
            if (error.error != undefined) {
              errorMessage = error.error['errMsg'];
            } else {
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
            return this.processError(errorMessage);
          } */
        })
      )
  }

  processError(msg) {
    this.msg = ['error', msg];
    this.displayService.setMsg(this.msg);
    window.scroll(0, 0);
    // this.displayService.hideLoadingContent();
    return throwError(msg);
  }

}
