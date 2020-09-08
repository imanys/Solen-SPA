import {Injectable} from '@angular/core';

import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';


@Injectable()
export class StorageInfoEffects {

  constructor(private actions: Actions, private service: fromServices.StorageInfoService) {
  }

  loadStorageInfo$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadStorageInfo),
      exhaustMap(() => {
        return this.service.getStorageInfo().pipe(
          map(storageInfo => fromActions.loadStorageInfoSuccess(storageInfo)),
          catchError((error: any) => of(fromActions.loadStorageInfoFail(error)))
        );
      })
    )
  );
}
