import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {LearnerLastCourseProgressDto, LearnerInfoViewModel} from 'src/app/models';

@Injectable()
export class LearnerInfoService {
  readonly endPoint = `${this.env.apiUrl}/dashboard/learner`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  getLastCourseProgress(): Observable<LearnerLastCourseProgressDto> {
    return this.http
      .get<LearnerInfoViewModel>(this.endPoint)
      .pipe(
        map(viewModel => viewModel.lastCourseProgress),
        catchError((error: any) => throwError(error))
      );
  }
}
