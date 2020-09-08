import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {
  AddLearnerAccessHistoryCommand, CompletedLecturesViewModel, CompleteLectureCommand,
  LearnerCourseContentDto,
  LearnerCourseContentViewModel,
} from 'src/app/models';

@Injectable()
export class CourseService {
  readonly endPoint = `${this.env.apiUrl}/learning/courses`;

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  getCourseContent(
    courseId: string
  ): Observable<{
    courseContent: LearnerCourseContentDto;
    lastLectureId: string
  }> {
    return this.http
      .get<LearnerCourseContentViewModel>(`${this.endPoint}/${courseId}`)
      .pipe(
        map(viewModel => ({
          courseContent: viewModel.courseContent,
          lastLectureId: viewModel.lastLectureId
        })),

        catchError((error: any) => throwError(error))
      );
  }

  getCompletedLectures(courseId: string): Observable<string[]> {
    return this.http.get<CompletedLecturesViewModel>(`${this.endPoint}/${courseId}/completedLectures`)
      .pipe(
        map(viewModel => viewModel.completedLectures),
        catchError((error: any) => throwError(error))
      );
  }

  updateLastLecture(command: AddLearnerAccessHistoryCommand) {
    return this.http
      .post(`${this.endPoint}/addLearnerAccessHistory`, command)
      .pipe(catchError((error: any) => throwError(error)));
  }

  completeLecture(command: CompleteLectureCommand) {
    return this.http
      .post(`${this.endPoint}/completeLecture`, command)
      .pipe(catchError((error: any) => throwError(error)));
  }

  uncompleteLecture(lectureId: string) {
    return this.http
      .delete(`${this.endPoint}/uncompleteLecture/${lectureId}`)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
