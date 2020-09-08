import {Injectable} from '@angular/core';

import {Actions, ofType, createEffect} from '@ngrx/effects';
import {switchMap, map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromActions from '../actions/courses-filters.actions';
import * as fromServices from '../../services';
import * as fromUiActions from '../../../../../../shared/store/actions';


@Injectable()
export class CoursesFiltersEffects {
  constructor(
    private actions: Actions,
    private service: fromServices.CoursesService
  ) {
  }

  loadCoursesFilters$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadCoursesFilters),
      switchMap(() => {
        return this.service.getCoursesFilters().pipe(
          map(filersVm =>
            fromActions.loadCoursesFiltersSuccess(filersVm)
          ),
          catchError((error: any) =>
            of(fromActions.loadCoursesFiltersFail(error))
          )
        );
      })
    )
  );

  loadCoursesFiltersFail$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadCoursesFiltersFail),
      map(({error}) => fromUiActions.openSnackBarError(error))
    )
  );

}
