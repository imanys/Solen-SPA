import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromStore from '../../../shared/store';
import * as fromRouter from 'src/app/app-routing/store';

import {LearningPathDto} from 'src/app/models';


@Component({
  selector: 'app-learning-paths-list-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-learning-paths-list [learningPaths]="learningPaths$ | async"
                             (learningPathDeleted)="onLearningPathDeleted($event)"
                             (learningPathSelected)="onLearningPathSelected($event)">
    </app-learning-paths-list>
  `
})
export class LearningPathsListContainerComponent implements OnInit {
  learningPaths$: Observable<LearningPathDto[]>;

  constructor(private store: Store<fromStore.LearningPathsState>) {
  }

  ngOnInit() {
    this.learningPaths$ = this.store.select(fromStore.getAllLearningPaths);
  }

  onLearningPathSelected(learningPathId: string) {
    const path = `/workspace/learning-paths/${learningPathId}`;

    this.store.dispatch(fromRouter.go({path: [path]}));
  }

  onLearningPathDeleted(learningPathId: string) {
    this.store.dispatch(fromStore.deleteLearningPath(learningPathId));
  }
}

