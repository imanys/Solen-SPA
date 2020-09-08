import {Injectable} from '@angular/core';

import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';


@Injectable()
export class UsersInfoEffects {

  constructor(private actions: Actions, private service: fromServices.UsersInfoService) {
  }

  loadUsersInfo$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadUserCount),
      exhaustMap(() => {
        return this.service.getUserCount().pipe(
          map(userCount => fromActions.loadUserCountSuccess(userCount)),
          catchError((error: any) => of(fromActions.loadUserCountFail(error)))
        );
      })
    )
  );
}
