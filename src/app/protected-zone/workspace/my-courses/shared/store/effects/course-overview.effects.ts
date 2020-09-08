import {Injectable} from '@angular/core';

import {Actions, ofType, createEffect} from '@ngrx/effects';
import {catchError, switchMap, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromActions from '../actions/course-overview.actions';
import * as fromServices from '../../services';
import * as fromUiActions from 'src/app/shared/store/actions';

@Injectable()
export class CourseOverviewEffects {
  constructor(
    private actions: Actions,
    private coursesService: fromServices.CoursesService
  ) {
  }

  loadCourseOverview$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadCourseOverview),
      switchMap(({courseId}) => {
        return this.coursesService.getCourseOverview(courseId).pipe(
          map((courseOverview) => fromActions.loadCourseOverviewSuccess(courseOverview)),
          catchError((error: any) =>
            of(fromActions.loadCourseOverviewFail(error))
          )
        );
      })
    )
  );

  handleCourseFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadCourseOverviewFail),
      map(({error}) => fromUiActions.openSnackBarError(error))
    )
  );
}
