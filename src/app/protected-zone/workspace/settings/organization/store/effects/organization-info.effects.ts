import {Injectable} from '@angular/core';

import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromUiActions from 'src/app/shared/store/actions';


@Injectable()
export class OrganizationInfoEffects {

  constructor(private actions: Actions, private service: fromServices.OrganizationInfoService) {
  }

  loadOrganizationInfo$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadOrganizationInfo),
      exhaustMap(() => {
        return this.service.getOrganizationInfo().pipe(
          map(viewModel => fromActions.loadOrganizationInfoSuccess(viewModel)),
          catchError((error: any) => of(fromActions.loadOrganizationInfoFail(error)))
        );
      })
    )
  );

  updateOrganizationInfo$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.updateOrganizationInfo),
      exhaustMap(({command}) => {
        return this.service.updateOrganizationInfo(command).pipe(
          map(() => fromActions.updateOrganizationInfoSuccess()),
          catchError((error: any) => of(fromActions.updateOrganizationInfoFail(error)))
        );
      })
    )
  );

  handleUpdateInfoSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.updateOrganizationInfoSuccess
      ),
      map(() => fromUiActions.openSnackBar('Saved'))
    )
  );

  handleFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.loadOrganizationInfoFail,
        fromActions.updateOrganizationInfoFail
      ),
      map(({error}) => fromUiActions.openSnackBarError(error))
    )
  );
}
