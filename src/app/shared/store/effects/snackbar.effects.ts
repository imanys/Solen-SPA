import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { map, tap, delay } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import * as fromActions from '../actions/snackbar.actions';

@Injectable()
export class SnackBarEffects {
  constructor(private actions: Actions, private matSnackBar: MatSnackBar) {}

  closeSnackBar$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromActions.closeSnackBar),
        map(() => this.matSnackBar.dismiss())
      ),
    { dispatch: false }
  );

  openSnackBar$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.openSnackBar),
      tap(({ message }) => this.matSnackBar.open(message)),
      delay(2000),
      map(() => fromActions.closeSnackBar())
    )
  );

  openSnackBarError$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromActions.openSnackBarError),
        tap(({ error }) =>
          this.matSnackBar.open(error, 'Close', {
            panelClass: 'red-snackbar'
          })
        )
      ),
    { dispatch: false }
  );

  openNotificationSnackBar$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.openNotificationSnackBar),
      tap(({ message }) => this.matSnackBar.open(message)),
      delay(5000),
      map(() => fromActions.closeSnackBar())
    )
  );

}
