import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {CourseLearningPathDto} from 'src/app/models';

import * as fromStore from '../../../../shared/store';

@Component({
  selector: 'app-course-learning-paths',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['learning-paths.component.scss'],
  template: `
    <app-course-learning-paths-list-view
      [learningPaths]="learningPaths$ | async"
      [selectedLearningPaths]="selectedLearningPath$ | async"
    >
    </app-course-learning-paths-list-view>
  `
})
export class LearningPathsComponent implements OnInit {
  learningPaths$: Observable<CourseLearningPathDto[]>;
  selectedLearningPath$: Observable<CourseLearningPathDto[]>;

  constructor(private store: Store<fromStore.CourseManagementState>) {
  }

  ngOnInit() {
    this.learningPaths$ = this.store.select(fromStore.getAllLearningPaths);
    this.selectedLearningPath$ = this.store.select(fromStore.getSelectedLearningPaths);
  }
}
