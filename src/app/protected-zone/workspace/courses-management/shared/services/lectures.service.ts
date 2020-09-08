import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';

import {throwError, Observable, Subject} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {EnvironmentService} from 'src/environments/environment.service';
import {
  UpdateLecturesOrdersCommand,
  LectureDto,
  LectureViewModel,
  CreateLectureCommand,
  CommandResponse,
  UpdateLectureCommand
} from 'src/app/models/models';

import * as fromAuthServices from 'src/app/auth/services';

@Injectable()
export class LecturesService {
  constructor(private http: HttpClient, private env: EnvironmentService,
              private authService: fromAuthServices.AuthService) {
  }

  reorderLectures(command: UpdateLecturesOrdersCommand) {
    return this.http
      .put(
        `${this.env.apiUrl}/courses-management/modules/lecturesOrders`,
        command
      )
      .pipe(catchError((error: any) => throwError(error)));
  }

  getLecture(lectureId: string): Observable<LectureDto> {
    return this.http
      .get<LectureViewModel>(
        `${this.env.apiUrl}/courses-management/lectures/${lectureId}`
      )
      .pipe(
        map((view: LectureViewModel) => view.lecture),
        catchError((error: any) => throwError(error))
      );
  }

  createLecture(command: CreateLectureCommand) {
    return this.http
      .post<CommandResponse>(`${this.env.apiUrl}/courses-management/lectures`, command)
      .pipe(
        map(response => response.value),
        catchError((error: any) => throwError(error))
      );
  }

  updateLecture(command: UpdateLectureCommand) {
    return this.http
      .put(
        `${this.env.apiUrl}/courses-management/lectures`,
        command
      )
      .pipe(catchError((error: any) => throwError(error)));
  }

  deleteLecture(lectureId: string) {
    return this.http
      .delete(`${this.env.apiUrl}/courses-management/lectures/${lectureId}`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  public uploadVideo(lectureId: string, file: File, lectureType: string): Observable<number> {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('lectureType', lectureType);

    // create a http-put request and pass the form
    // tell it to report the upload progress
    const req = new HttpRequest(
      'PUT',
      `${this.env.apiUrl}/courses-management/lectures/media/${lectureId}`,
      formData,
      {
        reportProgress: true
      }
    );

    // create a new progress-subject for every file
    const progress = new Subject<number>();

    // send the http-request and subscribe for progress-updates
    this.authService.refreshToken().subscribe(() =>
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage
          const percentDone = Math.round((100 * event.loaded) / event.total);

          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      }, error => {
        progress.error(error);
      })
    );
    return progress.asObservable();
  }
}
