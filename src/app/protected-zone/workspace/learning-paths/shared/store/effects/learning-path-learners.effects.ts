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


@Injectable()
export class LearningPathLearnersEffects {

  constructor(private actions: Actions, private service: fromServices.LearningPathLearnersService,
              private store: Store<fromStore.LearningPathsState>) {
  }

  loadLearningPathLearners$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadLearningPathLearners),
      withLatestFrom(this.store.select(getSelectedLearningPath)),
      exhaustMap(([_, learningPath]) => {
        return this.service.getLearningPathLearners(learningPath.id).pipe(
          map(courses => fromActions.loadLearningPathLearnersSuccess(courses)),
          catchError((error: any) => of(fromActions.loadLearningPathLearnersFail(error)))
        );
      })
    )
  );

  loadCurrentLearnerProgress$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadLearnerProgress),
      exhaustMap(({learnerId}) => {
        return this.service.getLearnerProgress(learnerId).pipe(
          map(learnerProgress => fromActions.loadLearnerProgressSuccess(learnerProgress)),
          catchError((error: any) => of(fromActions.loadLearnerProgressFail(error)))
        );
      })
    )
  );

  handleFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.loadLearningPathLearnersFail,
        fromActions.loadLearnerProgressFail,
      ),
      map(({error}) => fromUiActions.openSnackBarError(error))
    )
  );
}
