import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

import {Observable, of} from 'rxjs';
import {filter, take, switchMap, catchError, tap} from 'rxjs/operators';

import {Store} from '@ngrx/store';
import * as fromStore from '../store';

@Injectable()
export class CoursesGuard implements CanActivate {
  constructor(private store: Store<fromStore.CourseManagementState>) {
  }

  canActivate(): Observable<boolean> {
    this.store.dispatch(fromStore.unLoadCourses());
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore() {
    return this.store.select(fromStore.getCoursesFiltersLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromStore.loadCoursesFilters());
        }
      }),
      filter(loaded => loaded),
      switchMap(() => this.store.select(fromStore.getCoursesLoaded).pipe(
        tap((loaded) => {
          if (!loaded) {
            this.store.dispatch(fromStore.loadCourses());
          }
        }),
        filter(loaded => loaded),
        take(1)
      ))
    );
  }
}
