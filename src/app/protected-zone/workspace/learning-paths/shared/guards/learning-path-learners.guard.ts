import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

import {Observable, of} from 'rxjs';
import {filter, take, switchMap, catchError, tap} from 'rxjs/operators';

import {Store} from '@ngrx/store';
import * as fromStore from '../store';

@Injectable()
export class LearningPathLearnersGuard implements CanActivate {
  constructor(private store: Store<fromStore.LearningPathsState>) {
  }

  canActivate(): Observable<boolean> {
    this.store.dispatch(fromStore.unloadLearningPathLearners());
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore() {
    return this.store.select(fromStore.getLearningPathLearnersLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromStore.loadLearningPathLearners());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
