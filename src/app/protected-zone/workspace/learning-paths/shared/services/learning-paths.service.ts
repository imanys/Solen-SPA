import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {
  CreateLearningPathCommand,
  LearningPathDto,
  LearningPathsViewModel,
  LearningPathViewModel,
  UpdateLearningPathCommand
} from 'src/app/models';

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

  getLearningPath(learningPathId: string): Observable<LearningPathDto> {
    return this.http
      .get<LearningPathViewModel>(`${this.endPoint}/${learningPathId}`)
      .pipe(
        map(viewModel => viewModel.learningPath),
        catchError((error: any) => throwError(error))
      );
  }

  deleteLearningPath(learningPathId: string) {
    return this.http
      .delete(`${this.endPoint}/${learningPathId}`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateLearningPath(command: UpdateLearningPathCommand) {
    return this.http
      .put(this.endPoint, command)
      .pipe(catchError((error: any) => throwError(error)));
  }

  createLearningPath(command: CreateLearningPathCommand) {
    return this.http
      .post(this.endPoint, command)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
