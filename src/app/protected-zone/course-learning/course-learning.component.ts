import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import * as fromStore from './course-progress/store';

@Component({
  selector: 'app-learn-root',
  styleUrls: ['course-learning.component.scss'],
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav role="navigation">
        <app-sidenav-list (sidenavClosed)="sidenav.close()"></app-sidenav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <app-course-progress-header
          [courseId]="courseId$ | async"
          [courseTitle]="courseTitle$ | async"
          [completedDuration]="completedDuration$ | async"
          [courseDuration]="courseDuration$ | async"
        ></app-course-progress-header>
          <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class CourseLearningComponent implements OnInit {
  courseId$: Observable<string>;
  courseTitle$: Observable<string>;
  courseDuration$: Observable<number>;
  completedDuration$: Observable<number>;

  constructor(private store: Store<fromStore.LearningState>) {}

  ngOnInit() {
    this.courseId$ = this.store.select(fromStore.getCourseId);
    this.courseTitle$ = this.store.select(fromStore.getCourseTitle);
    this.courseDuration$ = this.store.select(fromStore.getCourseDuration);
    this.completedDuration$ = this.store.select(fromStore.getCompletedDuration);
  }
}
