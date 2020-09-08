import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromStore from '../../../../shared/store';

import {LearnerCompletedCoursesDto, LearnerForLearningPathDto} from 'src/app/models';


@Component({
  selector: 'app-learning-path-learners-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-learning-path-learners [learners]="learners$ | async"
                                [learnerProgress]="currentLearnerProgress$ | async"
                                (loadLearnerProgress)="onLoadLearnerProgress($event)">
    </app-learning-path-learners>
  `
})
export class LearningPathLearnersContainerComponent implements OnInit {
  learners$: Observable<LearnerForLearningPathDto[]>;
  currentLearnerProgress$: Observable<LearnerCompletedCoursesDto>;

  constructor(private store: Store<fromStore.LearningPathsState>) {
  }

  ngOnInit() {
    this.learners$ = this.store.select(fromStore.getLearningPathLearners);
    this.currentLearnerProgress$ = this.store.select(fromStore.getCurrentLearnerProgress);
  }

  onLoadLearnerProgress(learnerId: string) {
    this.store.dispatch(fromStore.loadLearnerProgress(learnerId));
  }
}

