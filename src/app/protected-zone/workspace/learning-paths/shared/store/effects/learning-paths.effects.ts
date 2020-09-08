import {Injectable} from '@angular/core';

import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, exhaustMap, map, switchMap} from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromUiActions from 'src/app/shared/store/actions';


@Injectable()
export class LearningPathsEffects {

  constructor(private actions: Actions, private service: fromServices.LearningPathsService) {
  }

  loadLearningPaths$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadLearningPaths),
      exhaustMap(() => {
        return this.service.getLearningPaths().pipe(
          map(learningPaths => fromActions.loadLearningPathsSuccess(learningPaths)),
          catchError((error: any) => of(fromActions.loadLearningPathsFail(error)))
        );
      })
    )
  );

  deleteLearningPath$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.deleteLearningPath),
      exhaustMap(({learningPathId}) => {
        return this.service.deleteLearningPath(learningPathId).pipe(
          map(learningPaths => fromActions.deleteLearningPathSuccess()),
          catchError((error: any) => of(fromActions.deleteLearningPathFail(error)))
        );
      })
    )
  );

  handleDeleteSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.deleteLearningPathSuccess
      ),
      concatMap(() => [
        fromActions.loadLearningPaths(),
        fromUiActions.openSnackBar('Deleted')
      ])
    )
  );

  createLearningPath$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.createLearningPath),
      switchMap(({command}) => {
        return this.service.createLearningPath(command).pipe(
          map(() => fromActions.createLearningPathSuccess()),
          catchError((error: any) => of(fromActions.createLearningPathFail(error)))
        );
      })
    )
  );

  handleCreateSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.createLearningPathSuccess
      ),
      concatMap(() => [
        fromActions.loadLearningPaths(),
        fromUiActions.openSnackBar('Created')
      ])
    )
  );

  handleFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.loadLearningPathsFail,
        fromActions.deleteLearningPathFail,
        fromActions.createLearningPathFail,
      ),
      map(({error}) => fromUiActions.openSnackBarError(error))
    )
  );

  updateLearningPathInfo$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.updateLearningPathInfo),
      switchMap(({command}) => {
        return this.service.updateLearningPath(command).pipe(
          switchMap(() => {
            return this.service
              .getLearningPath(command.learningPathId)
              .pipe(map(learningPath => fromActions.updateLearningPathInfoSuccess(learningPath)));
          }),
          catchError((error: any) => of(fromActions.updateLearningPathInfoFail(error)))
        );
      })
    )
  );

  handleUpdateInfoSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.updateLearningPathInfoSuccess
      ),
      map(() => fromUiActions.openSnackBar('Saved'))
    )
  );
}
