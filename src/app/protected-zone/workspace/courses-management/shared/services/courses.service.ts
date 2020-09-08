import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {
  CourseViewModel,
  UpdateCourseCommand,
  CoursesListViewModel,
  CreateCourseCommand,
  CommandResponse,
  PublishCourseCommand,
  UnpublishCourseCommand,
  DraftCourseCommand,
  CoursesListResult
} from 'src/app/models/models';
import {CoursesFilter} from '../../../../../models';

@Injectable()
export class CoursesService {
  readonly endPoint = `${this.env.apiUrl}/courses-management/courses`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  deleteCourse(courseId: string): Observable<CommandResponse> {
    return this.http
      .delete<CommandResponse>(`${this.endPoint}/${courseId}`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  getCourse(courseId: string): Observable<CourseViewModel> {
    return this.http
      .get<CourseViewModel>(`${this.endPoint}/${courseId}`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateCourse(command: UpdateCourseCommand) {
    return this.http
      .put(this.endPoint, command)
      .pipe(catchError((error: any) => throwError(error)));
  }

  createCourse(command: CreateCourseCommand): Observable<string> {
    return this.http
      .post<CommandResponse>(this.endPoint, command)
      .pipe(
        map(response => response.value),
        catchError((error: any) => throwError(error))
      );
  }

  getCourses(filter: CoursesFilter): Observable<CoursesListResult> {

    let url = `${this.endPoint}?orderBy=${filter.orderBy}`;
    url = `${url}&authorId=${filter.authorId}`;
    url = `${url}&learningPathId=${filter.learningPathId}`;
    url = `${url}&statusId=${filter.statusId}`;
    url = `${url}&page=${filter.page}`;
    url = `${url}&pageSize=${filter.pageSize}`;

    return this.http
      .get<CoursesListViewModel>(url)
      .pipe(
        map(viewModel => viewModel.queryResult),
        catchError((error: any) => throwError(error))
      );
  }

  publishCourse(command: PublishCourseCommand) {
    return this.http
      .put(`${this.endPoint}/publish`, command)
      .pipe(catchError((error: any) => throwError(error)));
  }

  unpublishCourse(command: UnpublishCourseCommand) {
    return this.http
      .put(`${this.endPoint}/unpublish`, command)
      .pipe(catchError((error: any) => throwError(error)));
  }

  draftCourse(command: DraftCourseCommand) {
    return this.http
      .put(`${this.endPoint}/draft`, command)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
