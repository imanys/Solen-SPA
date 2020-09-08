import {Injectable} from '@angular/core';

import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, exhaustMap, map, withLatestFrom} from 'rxjs/operators';

import {getSelectedLearningPath} from '../selectors';

import * as fromStore from '../';
import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromUiActions from 'src/app/shared/store/actions';
import {CourseForLearningPathDto, CourseOrderDto, ModuleOrderDto, UpdateCoursesOrdersCommand} from '../../../../../../models';


@Injectable()
export class LearningPathCoursesEffects {

  constructor(private actions: Actions, private service: fromServices.LearningPathCoursesService,
              private store: Store<fromStore.LearningPathsState>) {
  }

  loadLearningPathCourses$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadLearningPathCourses),
      withLatestFrom(this.store.select(getSelectedLearningPath)),
      exhaustMap(([_, learningPath]) => {
        return this.service.getLearningPathCourses(learningPath.id).pipe(
          map(courses => fromActions.loadLearningPathCoursesSuccess(courses)),
          catchError((error: any) => of(fromActions.loadLearningPathCoursesFail(error)))
        );
      })
    )
  );

  addCoursesToLearningPath$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.addCoursesToLearningPath),
      exhaustMap(({command}) => {
        return this.service.AddCourses(command).pipe(
          map(courses => fromActions.addCoursesToLearningPathSuccess()),
          catchError((error: any) => of(fromActions.addCoursesToLearningPathFail(error)))
        );
      })
    )
  );

  removeCourseFromLearningPath$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.removeCourseFromLearningPath),
      exhaustMap(({command}) => {
        return this.service.removeCourse(command).pipe(
          map(courses => fromActions.removeCourseFromLearningPathSuccess()),
          catchError((error: any) => of(fromActions.removeCourseFromLearningPathFail(error)))
        );
      })
    )
  );

  updateCoursesOrders$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.updateCoursesOrders),
      withLatestFrom(this.store.select(getSelectedLearningPath)),
      exhaustMap(([{courses}, learningPath]) => {
        const coursesOrders: CourseOrderDto[] = courses.map(
          (course, index) => {
            return {courseId: course.id, order: index + 1};
          }
        );

        const command = {coursesOrders, learningPathId: learningPath.id};

        return this.service.updateCoursesOrders(command).pipe(
          map(() => fromActions.updateCoursesOrdersSuccess()),
          catchError((error: any) => of(fromActions.updateCoursesOrdersFail(error)))
        );
      })
    )
  );

  handleFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.loadLearningPathCoursesFail,
        fromActions.addCoursesToLearningPathFail,
        fromActions.removeCourseFromLearningPathFail,
        fromActions.updateCoursesOrdersFail
      ),
      map(({error}) => fromUiActions.openSnackBarError(error))
    )
  );

  handleAddCoursesToLearningPathSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.addCoursesToLearningPathSuccess
      ),
      concatMap(() => [
        fromUiActions.openSnackBar('Saved'),
        fromActions.loadLearningPathCourses(),
        fromActions.loadLearningPaths()
      ])
    )
  );

  handleUpdateCoursesOrdersSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.updateCoursesOrdersSuccess
      ),
      concatMap(() => [
        fromUiActions.openSnackBar('Saved'),
        fromActions.loadLearningPathCourses()
      ])
    )
  );

  handleRemoveCourseFromLearningPathSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.removeCourseFromLearningPathSuccess
      ),
      concatMap(() => [
        fromUiActions.openSnackBar('Course removed'),
        fromActions.loadLearningPathCourses(),
        fromActions.loadLearningPaths()
      ])
    )
  );
}
