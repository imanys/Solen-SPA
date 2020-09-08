import {Injectable} from '@angular/core';

import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';


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
}
