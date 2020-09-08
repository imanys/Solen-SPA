import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';

import {Observable, of} from 'rxjs';
import {tap, filter, switchMap, catchError, mapTo} from 'rxjs/operators';

import {Store} from '@ngrx/store';
import * as fromStore from '../store';

import {UserDto} from 'src/app/models';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private store: Store<fromStore.UserState>) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const userId = route.params.userId;
    return this.checkUserLoaded(userId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkUserLoaded(userId: string): Observable<boolean> {
    return this.store.select(fromStore.getUser).pipe(
      tap((user: UserDto) => {
        if (!user || user.id !== userId) {
          this.store.dispatch(fromStore.loadUser(userId));
        }
      }),
      filter(loadedUser => loadedUser && loadedUser.id === userId),
      mapTo(true)
    );
  }
}
