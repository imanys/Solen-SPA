import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {InitSigningUpCommand} from 'src/app/models';

@Injectable()
export class InitSigningUpService {
  readonly endPoint = `${this.env.apiUrl}/signing-up/organizations/init`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  initSigningUp(command: InitSigningUpCommand) {
    return this.http
      .post(this.endPoint, command)
      .pipe(catchError((error: any) => throwError(error)));
  }

}
