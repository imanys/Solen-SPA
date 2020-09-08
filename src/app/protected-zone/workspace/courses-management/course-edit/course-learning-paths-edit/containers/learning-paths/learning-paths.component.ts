import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {
  CourseDto,
  CourseLearningPathDto, UpdateCourseLearningPathsCommand
} from 'src/app/models';

import * as fromStore from '../../../../shared/store';

@Component({
  selector: 'app-learning-groups-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['learning-paths.component.scss'],
  template: `
    <app-course-learning-paths-list
      [course]="course$ | async"
      [learningPaths]="learningPaths$ | async"
      [selectedPaths]="selectedLearningPaths$ | async"
      (courseLearningPathsUpdated)="onCourseGroupsUpdate($event)"
    >
    </app-course-learning-paths-list>
  `
})
export class LearningPathsComponent implements OnInit {
  course$: Observable<CourseDto>;
  learningPaths$: Observable<CourseLearningPathDto[]>;
  selectedLearningPaths$: Observable<CourseLearningPathDto[]>;

  constructor(private store: Store<fromStore.CourseManagementState>) {
  }

  ngOnInit() {
    this.course$ = this.store.select(fromStore.getCourse);
    this.learningPaths$ = this.store.select(fromStore.getAllLearningPaths);
    this.selectedLearningPaths$ = this.store.select(fromStore.getSelectedLearningPaths);
  }

  onCourseGroupsUpdate(event: UpdateCourseLearningPathsCommand) {
    this.store.dispatch(fromStore.updateCourseLearningPaths(event));
  }
}
