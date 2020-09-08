import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import {switchMap, map, catchError, exhaustMap, concatMap} from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromActions from '../actions/course-content.actions';
import * as fromServices from '../../services';
import * as fromUiActions from 'src/app/shared/store/actions';
import * as fromRouter from 'src/app/app-routing/store';

@Injectable()
export class CourseContentEffects {
  constructor(
    private actions: Actions,
    private courseContentService: fromServices.CourseContentService,     private coursesService: fromServices.CoursesService
  ) {}

  loadCourseDetail$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadCourseContent),
      exhaustMap(({ courseId }) => {
        return this.courseContentService.getCourseContent(courseId).pipe(
          concatMap(courseDetail => [
            fromActions.loadCourseContentSuccess(courseDetail),
            fromActions.loadCourse(courseId)
            ]
          ),
          catchError((error: any) =>
            of(fromActions.loadCourseContentFail(error))
          )
        );
      })
    )
  );

  handleCourseContentFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadCourseContentFail),
      map(({ error }) => fromUiActions.openSnackBarError(error))
    )
  );

  loadCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadCourse),
      switchMap(({ courseId }) => {
        return this.coursesService.getCourse(courseId).pipe(
          map(course => fromActions.loadCourseSuccess(course)),
          catchError((error: any) => of(fromActions.loadCourseFail(error)))
        );
      })
    )
  );

  updateCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.updateCourse),
      switchMap(({ command }) => {
        return this.coursesService.updateCourse(command).pipe(
          switchMap(() => {
            return this.coursesService
              .getCourse(command.courseId)
              .pipe(
                map((viewModel) =>
                  fromActions.updateCourseSuccess(viewModel)
                )
              );
          }),
          catchError((error: any) => of(fromActions.updateCourseFail(error)))
        );
      })
    )
  );

  handleCourseSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.updateCourseSuccess),
      map(() => fromUiActions.openSnackBar('Saved'))
    )
  );

  publishCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.publishCourse),
      switchMap(({ command }) => {
        return this.coursesService.publishCourse(command).pipe(
          switchMap(() => {
            return this.coursesService
              .getCourse(command.courseId)
              .pipe(
                map((viewModel) =>
                  fromActions.publishCourseSuccess(viewModel)
                )
              );
          }),
          catchError((error: any) => of(fromActions.publishCourseFail(error)))
        );
      })
    )
  );

  handlePublishCourseSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.publishCourseSuccess),
      map(() => fromUiActions.openSnackBar('Course Published'))
    )
  );

  unpublishCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.unpublishCourse),
      switchMap(({ command }) => {
        return this.coursesService.unpublishCourse(command).pipe(
          switchMap(() => {
            return this.coursesService
              .getCourse(command.courseId)
              .pipe(
                map((viewModel) =>
                  fromActions.unpublishCourseSuccess(viewModel)
                )
              );
          }),
          catchError((error: any) => of(fromActions.unpublishCourseFail(error)))
        );
      })
    )
  );

  handleUnpublishCourseSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.unpublishCourseSuccess),
      map(() => fromUiActions.openSnackBar('Course unpublished'))
    )
  );

  draftCourse$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.draftCourse),
      switchMap(({ command }) => {
        return this.coursesService.draftCourse(command).pipe(
          switchMap(() => {
            return this.coursesService
              .getCourse(command.courseId)
              .pipe(
                map((viewModel) =>
                  fromActions.draftCourseSuccess(viewModel)
                )
              );
          }),
          catchError((error: any) => of(fromActions.draftCourseFail(error)))
        );
      })
    )
  );

  handleDraftCourseSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.draftCourseSuccess),
      map(({ viewModel }) =>
        fromRouter.go({
          path: ['/workspace/courses-management/courses', viewModel.course.id, 'edit']
        })
      )
    )
  );

  handlePublishFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.publishCourseFail,
        fromActions.unpublishCourseFail,
        fromActions.draftCourseFail
      ),
      map(({ error }) => fromUiActions.openSnackBarError(error))
    )
  );

  handleCoursesFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.loadCourseFail,
        fromActions.updateCourseFail
      ),
      map(({ error }) => fromUiActions.openSnackBarError(error))
    )
  );
}
