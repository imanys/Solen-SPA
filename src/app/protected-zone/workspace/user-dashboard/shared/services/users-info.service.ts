import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {UserCountInfoDto, UserCountInfoViewModel} from 'src/app/models';

@Injectable()
export class UsersInfoService {
  readonly endPoint = `${this.env.apiUrl}/dashboard/users`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  getUserCount(): Observable<UserCountInfoDto> {
    return this.http
      .get<UserCountInfoViewModel>(`${this.endPoint}/count`)
      .pipe(
        map(viewModel => viewModel.userCountInfo),
        catchError((error: any) => throwError(error))
      );
  }
}
