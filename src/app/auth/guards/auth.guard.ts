import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  CanActivateChild
} from '@angular/router';

import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {tap, filter, take, switchMap, catchError} from 'rxjs/operators';

import * as fromRouter from 'src/app/app-routing/store';
import * as fromFeature from '../store';
import * as fromServices from '../services';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private store: Store<fromFeature.AuthState>, private service: fromServices.AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const roles =
      next.firstChild && (next.firstChild.data.roles as Array<string>);

    return this.isUserLogged().pipe(
      switchMap(userLogged => {
        if (!userLogged) {
          return of(false);
        }

        if (!roles) {
          return of(true);
        }
        if (!this.roleMatch(roles, this.service.getLoggedUserRoles())) {
          this.store.dispatch(
            fromRouter.go({path: ['/workspace/dashboard']})
          );
          return of(false);
        }

        return of(true);
      })
    );
  }

  canActivateChild(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.canActivate(next);
  }

  isUserLogged(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap((userLogged: boolean) => {
        if (userLogged) {
          return of(true);
        }
        this.store.dispatch(fromRouter.go({path: ['/auth/login']}));
        return of(false);
      }),
      catchError(() => {
        this.store.dispatch(fromRouter.go({path: ['/auth/login']}));
        return of(false);
      })
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromFeature.getUserLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          const token = this.service.getToken();
          if (token) {
            this.store.dispatch(fromFeature.getCurrentUser());
          } else {
            this.store.dispatch(fromRouter.go({path: ['/auth/login']}));
          }
        }
      }),
      filter(loaded => loaded),
      take(1),
      switchMap(() => this.store.select(fromFeature.getIsUserLogged))
    );
  }

  roleMatch(allowedRoles: Array<string>, userRoles: Array<string>): boolean {
    let isMatch = false;
    allowedRoles.forEach(role => {
      if (userRoles.includes(role)) {
        isMatch = true;
        return;
      }
    });

    return isMatch;
  }
}
