import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {LearningPathDto, LearningPathsViewModel,} from 'src/app/models';

@Injectable()
export class LearningPathsService {
  readonly endPoint = `${this.env.apiUrl}/learning-paths`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  getLearningPaths(): Observable<LearningPathDto[]> {
    return this.http
      .get<LearningPathsViewModel>(this.endPoint)
      .pipe(
        map(viewModel => viewModel.learningPaths),
        catchError((error: any) => throwError(error))
      );
  }
}
