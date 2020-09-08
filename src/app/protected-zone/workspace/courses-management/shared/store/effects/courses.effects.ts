import {Injectable} from '@angular/core';

import {Actions, ofType, createEffect} from '@ngrx/effects';
import {
  switchMap,
  map,
  catchError,
  concatMap,
  exhaustMap, withLatestFrom
} from 'rxjs/operators';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';

import {getCurrentFilter} from '../selectors';
import {CourseManagementState} from '../reducers';

import * as fromActions from '../actions/courses.actions';
import * as fromServices from '../../services';
import * as fromRouter from 'src/app/app-routing/store';
import * as fromUiActions from 'src/app/shared/store/actions';
import * as fromFilters from '../actions/courses-filters.actions';


@Injectable()
export class CoursesEffects {
  constructor(
    private actions: Actions,
    private coursesService: fromServices.CoursesService,
    private store: Store<CourseManagementState>
  ) {
  }

  removeCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.deleteCourse),
      switchMap(({courseId}) => {
        return this.coursesService.deleteCourse(courseId).pipe(
          map(() => fromActions.deleteCourseSuccess(courseId)),
          catchError((error: any) => of(fromActions.deleteCourseFail(error)))
        );
      })
    )
  );

  handleDeleteCourseSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.deleteCourseSuccess),
      concatMap(() => [
        fromUiActions.openSnackBar('Course deleted'),
        fromRouter.go({path: ['/workspace/courses-management/courses']})
      ])
    )
  );

  loadCourses$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadCourses),
      withLatestFrom(this.store.select(getCurrentFilter)),
      exhaustMap(([_, filter]) => {
        return this.coursesService.getCourses(filter).pipe(
          map(courses => fromActions.loadCoursesSuccess(courses)),
          catchError((error: any) => of(fromActions.loadCoursesFail(error)))
        );
      })
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

  createCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.createCourse),
      switchMap(({command}) => {
        return this.coursesService.createCourse(command).pipe(
          switchMap(courseId => {
            return this.coursesService
              .getCourse(courseId)
              .pipe(
                map((viewModel) =>
                  fromActions.createCourseSuccess(viewModel.course)
                )
              );
          }),
          catchError((error: any) => of(fromActions.createCourseFail(error)))
        );
      })
    )
  );

  handleCreateCourseSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.createCourseSuccess),
      concatMap(({course}) => [
        fromUiActions.openSnackBar('Course created'),
        fromRouter.go({path: ['/workspace/courses-management/courses', course.id, 'edit']})
      ])
    )
  );

  handleCoursesFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.loadCoursesFail,
        fromActions.createCourseFail,
        fromActions.deleteCourseFail,
      ),
      map(({error}) => fromUiActions.openSnackBarError(error))
    )
  );


}
