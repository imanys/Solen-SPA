import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { EnvironmentService } from 'src/environments/environment.service';
import { CourseContentViewModel, CourseContentDto } from 'src/app/models/models';

@Injectable()
export class CourseContentService {
  constructor(private http: HttpClient, private env: EnvironmentService) {}

  getCourseContent(courseId: string): Observable<CourseContentDto> {
    return this.http
      .get<CourseContentViewModel>(
        `${this.env.apiUrl}/courses-management/courses/${courseId}/detail`
      )
      .pipe(
        map(viewModel => viewModel.courseContent),
        catchError((error: any) => throwError(error))
      );
  }
}
