import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {CoursesFiltersViewModel} from 'src/app/models/models';

@Injectable()
export class CoursesFiltersService {
  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  getCoursesFilters(): Observable<CoursesFiltersViewModel> {
    return this.http
      .get<CoursesFiltersViewModel>(
        `${this.env.apiUrl}/courses-management/courses/filters`
      )
      .pipe(catchError((error: any) => throwError(error)));
  }
}
