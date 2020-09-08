import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {EnvironmentService} from '../../../../../environments/environment.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {NotificationDto, NotificationsListViewModel} from '../../../../models';


@Injectable()
export class NotificationsService {
  readonly endPoint = `${this.env.apiUrl}/notifications`;

  constructor(private http: HttpClient, private env: EnvironmentService) {}

  getNotifications(): Observable<NotificationDto[]> {
    return this.http.get<NotificationsListViewModel>(`${this.endPoint}`).pipe(
      map(viewModel => viewModel.notifications),
      catchError((error: any) => throwError(error))
    );
  }

  markNotificationAsRead(notificationId: string) {
    return this.http
      .put(`${this.endPoint}/${notificationId}`, notificationId)
      .pipe(catchError((error: any) => throwError(error)));
  }

}
