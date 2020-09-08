import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  map,
  switchMap,
  catchError,
  concatMap,
  withLatestFrom
} from 'rxjs/operators';
import { of } from 'rxjs';

import { Store } from '@ngrx/store';
import { CourseManagementState } from '../reducers';
import {
  getAllLectures,
  getSelectedModule,
  getCourse
} from '../selectors';

import * as fromCourseContentActions from '../actions/course-content.actions';
import * as fromModuleActions from '../actions/modules.actions';
import * as fromActions from '../actions/lectures.actions';
import * as fromUiActions from 'src/app/shared/store/actions';
import * as fromServices from '../../services';

import { LectureDto, LectureOrderDto } from 'src/app/models/models';

@Injectable()
export class LecturesEffects {
  constructor(
    private actions: Actions,
    private lecturesService: fromServices.LecturesService,
    private store: Store<CourseManagementState>
  ) {}

  loadCourseContentSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromCourseContentActions.loadCourseContentSuccess),
      map(({ courseContent }) => fromActions.loadCourseLectures(courseContent))
    )
  );

  reorderLectures$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.reorderCourseLectures),
      withLatestFrom(this.store.select(getSelectedModule)),
      withLatestFrom(this.store.select(getAllLectures)),
      switchMap(([[{ lectures }, module], lecturesFromStore]) => {
        const lecturesToOrder: LectureDto[] =
          lectures.length === 0 ? lecturesFromStore : lectures;

        if (lecturesToOrder.length === 0) {
          return of( fromActions.reorderCourseLecturesSuccess([]));
        }

        const lecturesNewOrders: LectureOrderDto[] = lecturesToOrder.map(
          (lecture, index) => {
            return { lectureId: lecture.id, order: index + 1 };
          }
        );

        return this.lecturesService
          .reorderLectures({
            moduleId: module.id,
            lecturesOrders: lecturesNewOrders
          })
          .pipe(
            map(() =>
              fromActions.reorderCourseLecturesSuccess(lecturesNewOrders)
            ),
            catchError((error: any) =>
              of(fromActions.reorderCourseLecturesFail(error))
            )
          );
      })
    )
  );

  createLecture$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.createLecture),
      withLatestFrom(this.store.select(getCourse)),
      switchMap(([{ command }, course]) => {
        return this.lecturesService.createLecture(command).pipe(
          switchMap((lectureId: string) => {
            return this.lecturesService
              .getLecture(lectureId)
              .pipe(
                concatMap((lecture: LectureDto) => [
                  fromActions.createLectureSuccess(lecture),
                  fromActions.setCurrentLectureId(lecture.id),
                  fromModuleActions.loadModule(lecture.moduleId),
                  fromCourseContentActions.loadCourse(course.id)
                ])
              );
          }),
          catchError((error: any) => of(fromActions.createLectureFail(error)))
        );
      })
    )
  );

  updateLecture$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.updateLecture),
      withLatestFrom(this.store.select(getCourse)),
      switchMap(([{ command }, course]) => {
        return this.lecturesService.updateLecture(command).pipe(
          switchMap(() => {
            return this.lecturesService
              .getLecture(command.lectureId)
              .pipe(
                concatMap((lecture: LectureDto) => [
                  fromActions.updateLectureSuccess(lecture),
                  fromModuleActions.loadModule(lecture.moduleId),
                  fromCourseContentActions.loadCourse(course.id)
                ])
              );
          }),
          catchError((error: any) => of(fromActions.updateLectureFail(error)))
        );
      })
    )
  );

  handleLecturesSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.createLectureSuccess,
        fromActions.updateLectureSuccess
      ),
      map(() => fromUiActions.openSnackBar('Saved'))
    )
  );

  deleteLecture$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.deleteLecture),
      withLatestFrom(this.store.select(getCourse)),
      switchMap(([{ lecture }, course]) => {
        return this.lecturesService.deleteLecture(lecture.id).pipe(
          concatMap(() => [
            fromActions.deleteLectureSuccess(lecture.id),
            fromModuleActions.loadModule(lecture.moduleId),
            fromCourseContentActions.loadCourse(course.id)
          ]),
          catchError((error: any) => of(fromActions.deleteLectureFail(error)))
        );
      })
    )
  );

  handleDeleteLectureSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.deleteLectureSuccess),
      concatMap(() => [
        fromUiActions.openSnackBar('Lecture deleted'),
        fromActions.reorderCourseLectures([])
      ])
    )
  );

  handleLecturesFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.createLectureFail,
        fromActions.deleteLectureFail,
        fromActions.updateLectureFail,
        fromActions.reorderCourseLecturesFail
      ),
      map(({ error }) => fromUiActions.openSnackBarError(error))
    )
  );
}
