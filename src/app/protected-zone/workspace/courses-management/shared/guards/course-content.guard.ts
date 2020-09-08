import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';

import {Observable, of} from 'rxjs';
import {tap, filter, switchMap, catchError, mapTo} from 'rxjs/operators';

import {Store} from '@ngrx/store';
import * as fromStore from '../store';

import {CourseDto} from '../../../../../models';

@Injectable()
export class CourseContentGuard implements CanActivate {
  constructor(private store: Store<fromStore.CourseManagementState>) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const courseId = route.parent.params.courseId ? route.parent.params.courseId : route.parent.parent.params.courseId;
    return this.checkContentLoaded(courseId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkContentLoaded(courseId: string): Observable<boolean> {
    return this.store.select(fromStore.getCourse).pipe(
      tap((course: CourseDto) => {
        if (!course || course.id !== courseId) {
          this.store.dispatch(fromStore.loadCourseContent(courseId));
          this.store.dispatch(fromStore.loadCourseLearningPaths(courseId));
        }
      }),
      filter(loadedCourse => loadedCourse && loadedCourse.id === courseId),
      mapTo(true)
    );
  }
}
