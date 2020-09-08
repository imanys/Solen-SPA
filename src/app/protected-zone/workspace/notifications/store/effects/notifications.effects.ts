import {Injectable} from '@angular/core';

import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap} from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';


@Injectable()
export class NotificationsEffects {

  constructor(private actions: Actions, private notificationsService: fromServices.NotificationsService) {
  }

  loadNotifications$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadNotifications),
      exhaustMap(() => {
        return this.notificationsService.getNotifications().pipe(
          map(courses => fromActions.loadNotificationsSuccess(courses)),
          catchError((error: any) => of(fromActions.loadNotificationsFail(error)))
        );
      })
    )
  );

  markNotificationAsRead$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromActions.markNotificationAsRead),
        switchMap(({ notificationId }) =>
          this.notificationsService.markNotificationAsRead(notificationId)
            .pipe(
              map(() => fromActions.loadNotifications())
            )
        )
      )
  );
}
