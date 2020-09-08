import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';

import {
  LearnerCompletedCoursesDto,
  LearnerForLearningPathDto,
  LearnerProgressViewModel,
  LearningPathLearnersViewModel
} from 'src/app/models';

@Injectable()
export class LearningPathLearnersService {
  readonly endPoint = `${this.env.apiUrl}/learning-paths`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  getLearningPathLearners(learningPathId: string): Observable<LearnerForLearningPathDto[]> {
    return this.http
      .get<LearningPathLearnersViewModel>(`${this.endPoint}/${learningPathId}/learners`)
      .pipe(
        map(viewModel => viewModel.learners),
        catchError((error: any) => throwError(error))
      );
  }

  getLearnerProgress(learnerId: string): Observable<LearnerCompletedCoursesDto> {
    return this.http
      .get<LearnerProgressViewModel>(`${this.endPoint}/learner-progress/${learnerId}`)
      .pipe(
        map(viewModel => viewModel.learnerCompletedCourses),
        catchError((error: any) => throwError(error))
      );
  }
}
