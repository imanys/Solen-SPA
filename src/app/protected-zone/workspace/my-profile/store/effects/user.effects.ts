import {Injectable} from '@angular/core';

import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, exhaustMap, map, switchMap} from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromAuth from 'src/app/auth/store/actions';
import * as fromServices from '../../services';
import * as fromUiActions from 'src/app/shared/store/actions';


@Injectable()
export class UserEffects {

  constructor(private actions: Actions, private service: fromServices.UserService) {
  }

  loadCurrentUserInfo$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadCurrentUserInfo),
      exhaustMap(() => {
        return this.service.getCurrentUserInfo().pipe(
          map(currentUser => fromActions.loadCurrentUserInfoSuccess(currentUser)),
          catchError((error: any) => of(fromActions.loadCurrentUserInfoFail(error)))
        );
      })
    )
  );

  updateCurrentUserInfo$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.updateCurrentUserInfo),
      switchMap(({command}) => {
        return this.service.updateCurrentUserInfo(command).pipe(
          switchMap(() => {
            return this.service.getCurrentUserInfo()
              .pipe(map(learningPath => fromActions.updateCurrentUserInfoSuccess(learningPath)));
          }),
          catchError((error: any) => of(fromActions.updateCurrentUserInfoFail(error)))
        );
      })
    )
  );

  handleUpdateInfoSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.updateCurrentUserInfoSuccess
      ),
      concatMap(() => [fromUiActions.openSnackBar('Saved'), fromAuth.getCurrentUser()])
    )
  );

  updateCurrentUserPassword$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.updateCurrentUserPassword),
      switchMap(({command}) => {
        return this.service.updateCurrentUserPassword(command).pipe(
          map(() => fromActions.updateCurrentUserPasswordSuccess()),
          catchError((error: any) => of(fromActions.updateCurrentUserPasswordFail(error)))
        );
      })
    )
  );

  handleUpdatePasswordSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.updateCurrentUserPasswordSuccess),
      concatMap(() => [fromUiActions.openSnackBar('Password Changed!')])
    )
  );

  handleFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.loadCurrentUserInfoFail,
        fromActions.updateCurrentUserInfoFail,
        fromActions.updateCurrentUserPasswordFail
      ),
      map(({error}) => fromUiActions.openSnackBarError(error))
    )
  );
}
