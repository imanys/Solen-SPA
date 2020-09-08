import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {OrganizationInfoViewModel, UpdateOrganizationInfoCommand} from 'src/app/models';

@Injectable()
export class OrganizationInfoService {
  readonly endPoint = `${this.env.apiUrl}/settings/organization`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }


  getOrganizationInfo(): Observable<OrganizationInfoViewModel> {
    return this.http
      .get<OrganizationInfoViewModel>(this.endPoint)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateOrganizationInfo(command: UpdateOrganizationInfoCommand) {
    return this.http
      .put(this.endPoint, command)
      .pipe(catchError((error: any) => throwError(error)));
  }

}
