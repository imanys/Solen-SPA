import {Injectable} from '@angular/core';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap} from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromUiActions from '../../../../../shared/store/actions';



@Injectable()
export class CourseNotificationsEffects {

  constructor(private actions: Actions) {
  }

  coursePublishedEvent$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(fromActions.coursePublishedEvent),
        concatMap(({message}) => {
          return [
            fromUiActions.openNotificationSnackBar(message),
            fromActions.loadNotifications()
          ];
        })
      );
    }
  );
}
