import {Injectable} from '@angular/core';

import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';


@Injectable()
export class CoursesInfoEffects {

  constructor(private actions: Actions, private service: fromServices.CoursesInfoService) {
  }

  loadCoursesInfo$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadCoursesInfo),
      exhaustMap(() => {
        return this.service.getCoursesInfo().pipe(
          map(viewModel => fromActions.loadCoursesInfoSuccess(viewModel)),
          catchError((error: any) => of(fromActions.loadCoursesInfoFail(error)))
        );
      })
    )
  );
}
