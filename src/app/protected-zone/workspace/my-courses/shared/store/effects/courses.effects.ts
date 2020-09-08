import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import {map, catchError, exhaustMap, withLatestFrom} from 'rxjs/operators';
import { of } from 'rxjs';

import {Store} from '@ngrx/store';
import {getCurrentFilter} from '../selectors';

import * as fromActions from '../actions/courses.actions';
import * as fromServices from '../../services';
import * as fromUiActions from 'src/app/shared/store/actions';
import * as fromStore from '../index';
import * as fromFilters from '../actions/courses-filters.actions';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions: Actions,
    private coursesService: fromServices.CoursesService,
    private store: Store<fromStore.LearningState>
  ) {}

  loadCourses$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadCourses),
      withLatestFrom(this.store.select(getCurrentFilter)),
      exhaustMap(([, filter]) => {
        return this.coursesService.getCourses(filter).pipe(
          map(queryResult => fromActions.loadCoursesSuccess(queryResult)),
          catchError((error: any) => of(fromActions.loadCoursesFail(error)))
        );
      })
    )
  );

  handleCoursesFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadCoursesFail),
      map(({ error }) => fromUiActions.openSnackBarError(error))
    )
  );

  loadCoursesWhenAnEventsOccurred$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromFilters.updateCurrentFilter,
        fromFilters.resetCurrentFilter
      ),
      map(() => fromActions.loadCourses())
    )
  );

}
