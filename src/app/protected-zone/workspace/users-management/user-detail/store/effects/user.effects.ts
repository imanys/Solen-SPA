import {Injectable} from '@angular/core';

import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, exhaustMap, map, switchMap} from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromUiActions from 'src/app/shared/store/actions';


@Injectable()
export class UserEffects {

  constructor(private actions: Actions, private service: fromServices.UserService) {
  }

  loadUser$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadUser),
      exhaustMap(({userId}) => {
        return this.service.getUser(userId).pipe(
          map(viewModel => fromActions.loadUserSuccess(viewModel)),
          catchError((error: any) => of(fromActions.loadUserFail(error)))
        );
      })
    )
  );

  updateUserLearningPath$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.updateUserLearningPath),
      exhaustMap(({command}) => {
        return this.service.updateUser(command).pipe(
          map(() => fromActions.updateUserSuccess()),
          catchError((error: any) => of(fromActions.updateUserFail(error)))
        );
      })
    )
  );

  updateUserRoles$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.updateUserRoles),
      switchMap(({command}) => {
        return this.service.updateUserRoles(command).pipe(
          switchMap(() => {
            return this.service
              .getUser(command.userId)
              .pipe(
                concatMap((viewModel) => [
                  fromActions.loadUserSuccess(viewModel),
                  fromActions.updateUserRolesSuccess()
                ]));
          }),
          catchError((error: any) => of(fromActions.updateUserRolesFail(error)))
        );
      })
    )
  );


  blockUser$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.blockUser),
      switchMap(({command}) => {
        return this.service.blockUser(command).pipe(
          switchMap(() => {
            return this.service
              .getUser(command.userId)
              .pipe(
                concatMap((viewModel) => [
                  fromActions.loadUserSuccess(viewModel),
                  fromActions.blockUserSuccess()
                ]));
          }),
          catchError((error: any) => of(fromActions.blockUserFail(error)))
        );
      })
    )
  );

  unblockUser$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.unblockUser),
      switchMap(({command}) => {
        return this.service.unblockUser(command).pipe(
          switchMap(() => {
            return this.service
              .getUser(command.userId)
              .pipe(
                concatMap((viewModel) => [
                  fromActions.loadUserSuccess(viewModel),
                  fromActions.unblockUserSuccess()
                ]));
          }),
          catchError((error: any) => of(fromActions.unblockUserFail(error)))
        );
      })
    )
  );


  handleSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.updateUserSuccess,
        fromActions.updateUserRolesSuccess,
        fromActions.blockUserSuccess,
        fromActions.unblockUserSuccess
      ),
      map(() => fromUiActions.openSnackBar('Saved'))
    )
  );


  handleFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.loadUserFail,
        fromActions.updateUserFail,
        fromActions.updateUserRolesFail,
        fromActions.blockUserFail,
        fromActions.unblockUserFail
      ),
      map(({error}) => fromUiActions.openSnackBarError(error))
    )
  );
}
