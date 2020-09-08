import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import {Actions, ofType, createEffect} from '@ngrx/effects';
import {
  map,
  withLatestFrom,
  concatMap,
  switchMap, catchError
} from 'rxjs/operators';

import {LearningState} from '../reducers';

import * as fromActions from '../actions/course-progress.actions';
import * as fromCourseActions from '../actions/course.actions';
import * as fromRouter from 'src/app/app-routing/store';
import * as fromServices from '../../services';

import {
  getCourseId,
  getStartPointLectureId,
  getSelectedLecture, getAllLectures,
} from '../selectors';
import {of} from 'rxjs';

@Injectable()
export class CourseProgressEffects {
  constructor(
    private actions: Actions,
    private store: Store<LearningState>,
    private coursesService: fromServices.CourseService
  ) {
  }

  loadLectures$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromCourseActions.loadCourseContentSuccess),
      map(({content}) => fromActions.loadLectures(content))
    )
  );

  courseContentLoaded$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.courseContentLoaded),
      withLatestFrom(this.store.select(getSelectedLecture)),
      withLatestFrom(this.store.select(getStartPointLectureId)),
      map(([[_, currentLecture], startLectureId]) => {
        const lectureId = currentLecture ? currentLecture.id : startLectureId;

        return fromActions.nextLecture(lectureId);
      })
    )
  );

  nextLecture$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.nextLecture),
      withLatestFrom(this.store.select(getCourseId)),
      concatMap(([{nextLectureId}, courseId]) => {
        const path = `/learn/course/${courseId}/lecture/${nextLectureId}`;

        this.scrollToAnchor('id' + nextLectureId, 200);
        return [
          fromRouter.go({path: [path]}),
          fromActions.updateLastLecture({
            lectureId: nextLectureId
          })
        ];
      })
    )
  );

  goToTheNextLecture$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.goToTheNextLecture),
      withLatestFrom(this.store.select(getAllLectures)),
      withLatestFrom(this.store.select(getSelectedLecture)),
      concatMap(([[_, lectures], currentLecture]) => {
        if (lectures && currentLecture) {
          let currentIndex = lectures.findIndex(x => x.id === currentLecture.id);
          if (currentIndex > -1) {
            const nextLectureId = currentIndex === lectures.length - 1 ? currentLecture.id : lectures[++currentIndex].id;
            return [fromActions.nextLecture(nextLectureId), fromActions.completeLecture(currentLecture.id)];
          }
        }
      })
    )
  );

  goToThePreviousLecture$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.goToThePreviousLecture),
      withLatestFrom(this.store.select(getAllLectures)),
      withLatestFrom(this.store.select(getSelectedLecture)),
      map(([[_, lectures], currentLecture]) => {
        if (lectures && currentLecture) {
          let currentIndex = lectures.findIndex(x => x.id === currentLecture.id);
          if (currentIndex > -1) {
            const nextLectureId = currentIndex === 0 ? currentLecture.id : lectures[--currentIndex].id;
            return fromActions.nextLecture(nextLectureId);
          }
        }
      })
    )
  );

  updateLastLecture$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromActions.updateLastLecture),
        switchMap(({command}) =>
          this.coursesService.updateLastLecture(command)
        )
      ),
    {dispatch: false}
  );

  completeLecture$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.completeLecture),
      switchMap(({lectureId}) => {
        return this.coursesService.completeLecture({lectureId}).pipe(
          map(() => fromActions.completeLectureSuccess()),
          catchError((error: any) =>
            of(fromActions.completeLectureFail(error))
          )
        );
      })
    )
  );

  uncompleteLecture$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.uncompleteLecture),
      switchMap(({lectureId}) => {
        return this.coursesService.uncompleteLecture(lectureId).pipe(
          map(() => fromActions.uncompleteLectureSuccess()),
          catchError((error: any) =>
            of(fromActions.uncompleteLectureFail(error))
          )
        );
      })
    )
  );

  loadCompletedLectures$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadCompletedLectures),
      switchMap(({courseId}) => {
        return this.coursesService.getCompletedLectures(courseId).pipe(
          map((completedLectures) => fromActions.loadCompletedLecturesSuccess(completedLectures)),
          catchError((error: any) =>
            of(fromActions.loadCompletedLecturesFail(error))
          )
        );
      })
    )
  );

  loadCompletedLecturesWhenEventsOccurred = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.completeLectureSuccess,
        fromActions.uncompleteLectureSuccess),
      withLatestFrom(this.store.select(getCourseId)),
      map(([_, courseId]) => fromActions.loadCompletedLectures(courseId))
    )
  );


  public scrollToAnchor(location: string, wait: number): void {
    const element = document.getElementById(location);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }, wait);
    }
  }
}
