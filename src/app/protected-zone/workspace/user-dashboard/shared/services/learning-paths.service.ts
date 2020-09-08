import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {LearningPathForDashboardDto, LearningPathsInfoViewModel} from 'src/app/models';

@Injectable()
export class LearningPathsService {
  readonly endPoint = `${this.env.apiUrl}/dashboard/learning-paths`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  getLearningPaths(): Observable<LearningPathForDashboardDto[]> {
    return this.http
      .get<LearningPathsInfoViewModel>(this.endPoint)
      .pipe(
        map(viewModel => viewModel.learningPaths),
        catchError((error: any) => throwError(error))
      );
  }
}
