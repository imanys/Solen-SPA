import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, switchMap, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromActions from '../actions/course.actions';
import * as fromCourseProgressActions from '../actions/course-progress.actions';
import * as fromServices from '../../services';
import * as fromUiActions from 'src/app/shared/store/actions';

@Injectable()
export class CourseEffects {
  constructor(
    private actions: Actions,
    private coursesService: fromServices.CourseService
  ) {}

  loadCourseContent$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadCourseContent),
      switchMap(({ courseId }) => {
        return this.coursesService.getCourseContent(courseId).pipe(
          concatMap(({ courseContent, lastLectureId }) => [
            fromActions.loadCourseContentSuccess(courseContent),
            fromCourseProgressActions.loadCompletedLectures(courseId),
            fromCourseProgressActions.loadLearnerLastLecture(lastLectureId)
          ]),
          catchError((error: any) =>
            of(fromActions.loadCourseContentFail(error))
          )
        );
      })
    )
  );

  handleCourseFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadCourseContentFail),
      map(({ error }) => fromUiActions.openSnackBarError(error))
    )
  );
}
