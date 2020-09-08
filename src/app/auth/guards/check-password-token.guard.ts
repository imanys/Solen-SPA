import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';

import {Observable, of} from 'rxjs';
import {switchMap, catchError} from 'rxjs/operators';

import * as fromServices from '../services';

@Injectable()
export class CheckPasswordTokenGuard implements CanActivate {
  constructor(private service: fromServices.AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const {token} = route.queryParams;
    if (!token) {
      return of(false);
    }

    return this.service.checkPasswordToken(token).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
