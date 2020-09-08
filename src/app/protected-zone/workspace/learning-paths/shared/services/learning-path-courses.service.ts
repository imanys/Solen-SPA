import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';

import {
  AddCoursesToLearningPathCommand,
  CourseForLearningPathDto,
  LearningPathCoursesViewModel,
  OtherCoursesToAddViewModel, RemoveCourseFromLearningPathCommand,
  UpdateCoursesOrdersCommand
} from 'src/app/models';

@Injectable()
export class LearningPathCoursesService {
  readonly endPoint = `${this.env.apiUrl}/learning-paths`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  getLearningPathCourses(learningPathId: string): Observable<CourseForLearningPathDto[]> {
    return this.http
      .get<LearningPathCoursesViewModel>(`${this.endPoint}/${learningPathId}/courses`)
      .pipe(
        map(viewModel => viewModel.courses),
        catchError((error: any) => throwError(error))
      );
  }

  getCoursesToAdd(learningPathId: string): Observable<CourseForLearningPathDto[]> {
    return this.http
      .get<OtherCoursesToAddViewModel>(`${this.endPoint}/${learningPathId}/courses-to-add`)
      .pipe(
        map(viewModel => viewModel.courses),
        catchError((error: any) => throwError(error))
      );
  }

  AddCourses(command: AddCoursesToLearningPathCommand) {
    return this.http
      .post(`${this.endPoint}/add-courses`, command)
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }

  removeCourse(command: RemoveCourseFromLearningPathCommand) {
    const url = `${this.endPoint}/remove-course`;
    return this.http.put(url, command).pipe(
      catchError((error: any) => throwError(error))
    );
  }

  updateCoursesOrders(command: UpdateCoursesOrdersCommand) {
    return this.http
      .put(`${this.endPoint}/update-courses-orders`, command)
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }
}
