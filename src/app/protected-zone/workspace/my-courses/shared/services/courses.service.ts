import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {
  LearnerCoursesListViewModel,
  LearnerCoursesListResult, LearnerCoursesFiltersViewModel,
  LearnerCoursesFilter, LearnerCourseOverviewDto, LearnerCourseOverviewViewModel
} from 'src/app/models';

@Injectable()
export class CoursesService {
  readonly endPoint = `${this.env.apiUrl}/learning/courses`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  getCourses(filter: LearnerCoursesFilter): Observable<LearnerCoursesListResult> {
    let url = `${this.endPoint}/list?orderBy=${filter.orderBy}`;
    url = `${url}&authorId=${filter.authorId}`;
    url = `${url}&page=${filter.page}`;
    url = `${url}&pageSize=${filter.pageSize}`;

    return this.http.get<LearnerCoursesListViewModel>(`${url}`).pipe(
      map(viewModel => viewModel.queryResult),
      catchError((error: any) => throwError(error))
    );
  }

  getCourseOverview(
    courseId: string
  ): Observable<LearnerCourseOverviewDto> {
    return this.http
      .get<LearnerCourseOverviewViewModel>(`${this.endPoint}/${courseId}/overview`)
      .pipe(
        map(viewModel => viewModel.courseOverview),
        catchError((error: any) => throwError(error))
      );
  }

  getCoursesFilters(): Observable<LearnerCoursesFiltersViewModel> {
    return this.http
      .get<LearnerCoursesFiltersViewModel>(
        `${this.endPoint}/filters`
      )
      .pipe(catchError((error: any) => throwError(error)));
  }
}
