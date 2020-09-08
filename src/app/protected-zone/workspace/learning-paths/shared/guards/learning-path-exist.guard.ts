import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';

import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {take, switchMap, catchError, map} from 'rxjs/operators';

import * as fromStore from '../store';

import {LearningPathDto} from 'src/app/models';

@Injectable()
export class LearningPathExistGuard implements CanActivate {
  constructor(private store: Store<fromStore.LearningPathsState>) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const learningPathId = route.params.learningPathId;
    return this.hasLearningPath(learningPathId);
  }

  hasLearningPath(id: string): Observable<boolean> {
    return this.store
      .select(fromStore.getLearningPathsEntities)
      .pipe(
        map((entities: { [key: string]: LearningPathDto }) => !!entities[id]),
        take(1)
      );
  }
}
