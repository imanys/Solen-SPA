import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {
  NotificationTemplateDto, NotificationTemplatesViewModel, NotificationTemplateViewModel, ToggleNotificationActivationCommand
} from 'src/app/models';

@Injectable()
export class TemplatesService {
  readonly endPoint = `${this.env.apiUrl}/settings/notifications/templates`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  getNotificationsTemplates(): Observable<NotificationTemplateDto[]> {
    return this.http
      .get<NotificationTemplatesViewModel>(this.endPoint)
      .pipe(
        map(viewModel => viewModel.notificationTemplates),
        catchError((error: any) => throwError(error))
      );
  }

  getNotificationTemplate(templateId: string): Observable<NotificationTemplateDto> {
    return this.http
      .get<NotificationTemplateViewModel>(`${this.endPoint}/${templateId}`)
      .pipe(
        map(viewModel => viewModel.notificationTemplate),
        catchError((error: any) => throwError(error))
      );
  }

  toggleNotificationActivation(command: ToggleNotificationActivationCommand) {
    return this.http
      .put(this.endPoint, command)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
