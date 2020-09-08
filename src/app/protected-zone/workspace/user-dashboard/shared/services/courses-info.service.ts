import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {CoursesInfoViewModel} from 'src/app/models';

@Injectable()
export class CoursesInfoService {
  readonly endPoint = `${this.env.apiUrl}/dashboard/courses`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  getCoursesInfo(): Observable<CoursesInfoViewModel> {
    return this.http
      .get<CoursesInfoViewModel>(`${this.endPoint}`)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
