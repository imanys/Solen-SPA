import {Injectable} from '@angular/core';

import {Actions, ofType, createEffect} from '@ngrx/effects';
import {switchMap, map, catchError, concatMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromActions from '../actions/course-learning-paths.actions';
import * as fromServices from '../../services';
import * as fromUiActions from 'src/app/shared/store/actions';
import * as fromCourseContentActions from '../actions/course-content.actions';

@Injectable()
export class CourseLearningPathsEffects {
  constructor(
    private actions: Actions,
    private service: fromServices.CourseLearningPathsService
  ) {
  }

  loadCourseLearningPaths$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadCourseLearningPaths),
      switchMap(({courseId}) => {
        return this.service.getCourseLearningPaths(courseId).pipe(
          map(courseLearningPathsVm =>
            fromActions.loadCourseLearningPathsSuccess(courseLearningPathsVm)
          ),
          catchError((error: any) =>
            of(fromActions.loadCourseLearningPathsFail(error))
          )
        );
      })
    )
  );

  updateCourseLearningPath$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.updateCourseLearningPaths),
      switchMap(({ command }) => {
        return this.service.updateCourseLearningPaths(command).pipe(
          concatMap(() => [
            fromActions.updateCourseLearningPathsSuccess(),
            fromActions.loadCourseLearningPaths(command.courseId),
            fromCourseContentActions.loadCourse(command.courseId)
          ]),
          catchError((error: any) =>
            of(fromActions.updateCourseLearningPathsFail(error))
          )
        );
      })
    )
  );

  handleCourseLearningPathsFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.loadCourseLearningPathsFail,
        fromActions.updateCourseLearningPathsFail
      ),
      map(({error}) => fromUiActions.openSnackBarError(error))
    )
  );
}
