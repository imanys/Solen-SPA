import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';

import {Observable, of} from 'rxjs';
import {
  tap,
  filter,
  mapTo,
  switchMap,
  catchError,
} from 'rxjs/operators';

import {Store} from '@ngrx/store';
import * as fromStore from '../store';


@Injectable()
export class CourseGuard implements CanActivate {
  constructor(private store: Store<fromStore.LearningState>) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const {courseId} = route.params;

    return this.checkContentLoaded(courseId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkContentLoaded(courseId: string): Observable<boolean> {
    return this.store.select(fromStore.getCourseId).pipe(
      tap((storeCourseId: string) => {
        if (!storeCourseId || storeCourseId !== courseId) {
          this.store.dispatch(fromStore.loadCourseContent(courseId));
        }
      }),
      filter(loadedCourseId => loadedCourseId === courseId),
      mapTo(true)
    );
  }
}
