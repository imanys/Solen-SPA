import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {CompleteUserSigningUpCommand, CheckUserSigningUpTokenQuery} from 'src/app/models';

@Injectable()
export class CompleteSigningUpService {
  readonly endPoint = `${this.env.apiUrl}/signing-up/users`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  checkSigningUpToken(signingUpToken: string) {
    const query: CheckUserSigningUpTokenQuery = {signingUpToken};
    return this.http
      .post(`${this.endPoint}/check`, query)
      .pipe(catchError((error: any) => throwError(error)));
  }

  completeSigningUp(command: CompleteUserSigningUpCommand) {
    return this.http
      .post(`${this.endPoint}/complete`, command)
      .pipe(catchError((error: any) => throwError(error)));
  }

}
