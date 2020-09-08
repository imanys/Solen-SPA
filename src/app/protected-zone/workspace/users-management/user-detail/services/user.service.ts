import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {
  UpdateUserLearningPathCommand, UpdateUserRolesCommand,
  UserViewModel, BlockUserCommand, UnblockUserCommand
} from 'src/app/models';

@Injectable()
export class UserService {
  readonly endPoint = `${this.env.apiUrl}/users`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  getUser(userId: string): Observable<UserViewModel> {
    return this.http
      .get<UserViewModel>(`${this.endPoint}/${userId}`)
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }

  updateUser(command: UpdateUserLearningPathCommand) {
    return this.http
      .put(this.endPoint, command)
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }

  updateUserRoles(command: UpdateUserRolesCommand) {
    return this.http
      .put(`${this.endPoint}/roles-and-status`, command)
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }

  blockUser(command: BlockUserCommand) {
    return this.http
      .put(`${this.endPoint}/block`, command)
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }

  unblockUser(command: UnblockUserCommand) {
    return this.http
      .put(`${this.endPoint}/unblock`, command)
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }
}
