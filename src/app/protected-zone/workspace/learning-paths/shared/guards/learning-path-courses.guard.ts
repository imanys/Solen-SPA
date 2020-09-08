import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

import {Observable, of} from 'rxjs';
import {filter, take, switchMap, catchError, tap} from 'rxjs/operators';

import {Store} from '@ngrx/store';
import * as fromStore from '../store';

@Injectable()
export class LearningPathCoursesGuard implements CanActivate {
  constructor(private store: Store<fromStore.LearningPathsState>) {
  }

  canActivate(): Observable<boolean> {
    this.store.dispatch(fromStore.unloadLearningPathCourses());
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore() {
    return this.store.select(fromStore.getLearningPathCoursesLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromStore.loadLearningPathCourses());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
