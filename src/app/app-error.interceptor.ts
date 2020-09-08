import {Router} from '@angular/router';
import {Injectable, Injector} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, finalize, switchMap} from 'rxjs/operators';

import * as fromAuthServices from './auth/services';

@Injectable()
export class AppErrorInterceptor implements HttpInterceptor {
  private isTokenRefreshing = false;

  constructor(private router: Router,
              private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            return throwError('Failed to connect to the server');
          }

          if (error.status === 401) {
            if (document.URL.endsWith('login')) {
              return throwError('invalid login or password');
            } else {
              console.log('Token expired. Attempting refresh ...');
              return this.handleHttpResponseError(req, next);
            }
          }

          if (error.status === 404) {
            this.router.navigate(['/']);
          }

          const serverError = error.error;
          let modalStateErrors = '';
          if (serverError && typeof serverError === 'object') {
            for (const key in serverError) {
              if (serverError[key]) {
                modalStateErrors += serverError[key] + '\n';
              }
            }
          }
          return throwError(modalStateErrors || serverError || 'Server Error');
        }
      })
    );
  }

  private handleHttpResponseError(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const authService = this.injector.get(fromAuthServices.AuthService);
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      return authService.refreshToken().pipe(
        switchMap(() => {
          return next.handle(this.attachTokenToRequest(request, authService.getToken()));
        }),
        catchError(err => {
          authService.logOut();
          return throwError(err);
        }),
        finalize(() => {
          this.isTokenRefreshing = false;
        })
      );

    } else {
      this.isTokenRefreshing = false;
      return authService.logOut() as any;
    }


  }

  private attachTokenToRequest(request: HttpRequest<any>, token) {
    return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppErrorInterceptor,
  multi: true
};
