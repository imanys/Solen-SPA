import { Injectable } from '@angular/core';

import { Actions, createEffect } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';

import * as fromActions from '../actions/loading-indicator.actions';

@Injectable()
export class LoadingIndicatorEffects {
  constructor(private actions$: Actions) {}

  showLoader$ = createEffect(() =>
    this.actions$.pipe(
      filter((action: any) => {
        return action && action.showLoader ? action : null;
      }),
      map((action: any) => fromActions.showSpinner(action))
    )
  );

  hideLoader$ = createEffect(() =>
    this.actions$.pipe(
      filter((action: any) => (action && action.triggerAction ? action : null)),
      map((action: any) => fromActions.hideSpinner(action))
    )
  );
}
