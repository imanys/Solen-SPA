import {Injectable} from '@angular/core';

import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, exhaustMap, map, switchMap} from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromUiActions from 'src/app/shared/store/actions';


@Injectable()
export class UsersEffects {

  constructor(private actions: Actions, private service: fromServices.UsersService) {
  }

  loadUsers$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadUsers),
      exhaustMap(() => {
        return this.service.getUsers().pipe(
          map(users => fromActions.loadUsersSuccess(users)),
          catchError((error: any) => of(fromActions.loadUsersFail(error)))
        );
      })
    )
  );

  handleLoadUsersSuccess = createEffect(() =>
    this.actions.pipe(
        ofType(fromActions.loadUsersSuccess),
      map(() => fromActions.loadLearningPaths())
    )
  );

  inviteMembers$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.inviteMembers),
      switchMap(({command}) => {
        return this.service.inviteMembers(command).pipe(
          map(users => fromActions.inviteMembersSuccess()),
          catchError((error: any) => of(fromActions.inviteMembersFail(error)))
        );
      })
    )
  );

  handleInvitationSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.inviteMembersSuccess
      ),
      concatMap(() => [fromUiActions.openSnackBar('Members invited'), fromActions.loadUsers()])
    )
  );

  handleFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.loadUsersFail,
        fromActions.inviteMembersFail
      ),
      map(({error}) => fromUiActions.openSnackBarError(error))
    )
  );
}
