import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {
  InviteMembersCommand,
  UsersListItemDto,
  UsersListViewModel
} from 'src/app/models';

@Injectable()
export class UsersService {
  readonly endPoint = `${this.env.apiUrl}/users`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  getUsers(): Observable<UsersListItemDto[]> {
    return this.http
      .get<UsersListViewModel>(this.endPoint)
      .pipe(
        map(viewModel => viewModel.users),
        catchError((error: any) => throwError(error))
      );
  }

  inviteMembers(command: InviteMembersCommand) {
    return this.http
      .post(`${this.endPoint}/invite`, command)
      .pipe(catchError((error: any) => throwError(error)));
  }


}
