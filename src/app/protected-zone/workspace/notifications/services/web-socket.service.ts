import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Store} from '@ngrx/store';
import * as signalR from '@aspnet/signalr';

import {EnvironmentService} from '../../../../../environments/environment.service';
import {NotificationsState} from '../store/reducers';
import * as fromActions from '../store/actions';


@Injectable()
export class WebSocketService {
  constructor(private http: HttpClient, private env: EnvironmentService, private store: Store<NotificationsState>) {
  }

  private hubConnection: signalR.HubConnection;

  public startConnection = (token: string) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.env.wsEventsUrl, {accessTokenFactory: () => token})
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('CoursePublishedEvent', (message) => {
      this.store.dispatch(fromActions.coursePublishedEvent(message));
    });
  };

  public disconnect() {
    this.hubConnection.stop();
  }
}
