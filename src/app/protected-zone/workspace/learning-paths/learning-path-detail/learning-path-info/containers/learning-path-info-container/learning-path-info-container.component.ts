import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromStore from '../../../../shared/store';

import {LearningPathDto, UpdateLearningPathCommand} from 'src/app/models';


@Component({
  selector: 'app-learning-path-info-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-learning-path-info [learningPath]="learningPaths$ | async"
                            (updated)="onUpdate($event)">

    </app-learning-path-info>
  `
})
export class LearningPathInfoContainerComponent implements OnInit {
  learningPaths$: Observable<LearningPathDto>;

  constructor(private store: Store<fromStore.LearningPathsState>) {
  }

  ngOnInit() {
    this.learningPaths$ = this.store.select(fromStore.getSelectedLearningPath);
  }

  onUpdate(event: UpdateLearningPathCommand) {
    this.store.dispatch(fromStore.updateLearningPathInfo(event));
  }
}

