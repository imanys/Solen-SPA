import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Store} from '@ngrx/store';
import {concatMap} from 'rxjs/operators';

import {NotificationsState} from '../reducers';
import * as fromActions from '../actions';
import * as fromAuthServices from 'src/app/auth/services';

import {WebSocketService} from '../../services';

@Injectable()
export class WebSocketEffects {

  constructor(private actions: Actions, private store: Store<NotificationsState>, private wsService: WebSocketService,
              private authService: fromAuthServices.AuthService) {
  }

  startWebSocketConnection$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromActions.startWebSocketConnection),
        concatMap(() => {
          const token = this.authService.getToken();
          return [
            this.wsService.startConnection(token),
            this.store.dispatch(fromActions.loadNotifications())
          ];
        })
      ),
    {dispatch: false}
  );
}
