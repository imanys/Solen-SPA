import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {UserForProfileDto, UserProfileViewModel, UpdateCurrentUserInfoCommand, UpdateCurrentUserPasswordCommand} from 'src/app/models';

@Injectable()
export class UserService {
  readonly endPoint = `${this.env.apiUrl}/user-profile`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  getCurrentUserInfo(): Observable<UserForProfileDto> {
    return this.http
      .get<UserProfileViewModel>(this.endPoint)
      .pipe(
        map(viewModel => viewModel.currentUser),
        catchError((error: any) => throwError(error))
      );
  }

  updateCurrentUserInfo(command: UpdateCurrentUserInfoCommand) {
    return this.http
      .put(this.endPoint, command)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateCurrentUserPassword(command: UpdateCurrentUserPasswordCommand) {
    return this.http
      .put(`${this.endPoint}/change-password`, command)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
