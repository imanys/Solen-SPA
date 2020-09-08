import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {
  GetCourseLearningPathsListVm, UpdateCourseLearningPathsCommand
} from 'src/app/models/models';

@Injectable()
export class CourseLearningPathsService {
  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  getCourseLearningPaths(courseId: string): Observable<GetCourseLearningPathsListVm> {
    return this.http
      .get<GetCourseLearningPathsListVm>(
        `${this.env.apiUrl}/courses-management/learning-paths/${courseId}`
      )
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateCourseLearningPaths(command: UpdateCourseLearningPathsCommand) {
    return this.http
      .put(`${this.env.apiUrl}/courses-management/learning-paths`, command)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
