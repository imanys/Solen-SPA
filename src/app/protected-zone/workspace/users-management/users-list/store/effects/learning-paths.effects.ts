import {Injectable} from '@angular/core';

import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';

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

  handleFails$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        fromActions.loadLearningPathsFail,
      ),
      map(({error}) => fromUiActions.openSnackBarError(error))
    )
  );

}
