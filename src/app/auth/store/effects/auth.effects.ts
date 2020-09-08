import {Injectable} from '@angular/core';

import {Actions, ofType, createEffect} from '@ngrx/effects';
import {of} from 'rxjs';
import {switchMap, map, catchError, tap, concatMap} from 'rxjs/operators';

import * as fromRouter from 'src/app/app-routing/store';
import * as authActions from '../actions';
import * as fromServices from '../../services';
import * as fromUiActions from 'src/app/shared/store/actions';
import * as fromNotifications from '../../../protected-zone/workspace/notifications/store/actions';


import {LoggedUserDto} from 'src/app/models';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: fromServices.AuthService
  ) {
  }

  logUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logUser),
      switchMap(({query}) => {
        return this.authService.logUser(query).pipe(
          map((viewModel) =>
            authActions.logUserSuccess(viewModel)
          ),
          catchError(error => of(authActions.logUserFail(error)))
        );
      })
    )
  );

  handleLogUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logUserSuccess),
      concatMap(() => [
        fromNotifications.startWebSocketConnection(),
        fromRouter.go({path: ['workspace/dashboard']}),
        fromUiActions.openSnackBar('You are now connected!')
      ])
    )
  );

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        return this.authService.currentUser().pipe(
          concatMap((loggedUser: LoggedUserDto) => [
              authActions.getCurrentUserSuccess(loggedUser),
              fromNotifications.startWebSocketConnection()
            ]
          ),
          catchError(error => of(authActions.logUserFail(error)))
        );
      })
    )
  );

  handleLogUserFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logUserFail, authActions.getCurrentUserFail),
      map(({error}) => fromUiActions.openSnackBarError(error))
    )
  );

  saveTokens$ = createEffect(() =>
      this.actions$.pipe(
        ofType(authActions.logUserSuccess),
        tap(({viewModel}) => this.authService.setTokens(viewModel.token, viewModel.refreshToken))
      )
    , {dispatch: false}
  );

  handleLogOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logOut),
      tap(() => this.authService.logOut())
    ), {dispatch: false});
}
