import {Injectable} from '@angular/core';

import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';


@Injectable()
export class LearnerInfoEffects {

  constructor(private actions: Actions, private service: fromServices.LearnerInfoService) {
  }

  loadLastCourseProgress$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadLastCourseProgress),
      exhaustMap(() => {
        return this.service.getLastCourseProgress().pipe(
          map(courseProgress => fromActions.loadLastCourseProgressSuccess(courseProgress)),
          catchError((error: any) => of(fromActions.loadLastCourseProgressFail(error)))
        );
      })
    )
  );
}
