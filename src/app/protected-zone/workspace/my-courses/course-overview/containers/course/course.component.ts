import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {LearnerCourseOverviewDto} from 'src/app/models';
import * as fromStore from '../../../shared/store';
import * as fromRouter from 'src/app/app-routing/store';

@Component({
  selector: 'app-course',
  styleUrls: ['course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div fxLayout="column" fxLayoutAlign="center">
      <app-go-back-button (clicked)="onGoBackClick()"></app-go-back-button>
      <app-course-general [course]="course$ | async" (learnButtonClicked)="onLearnButtonClick($event)"></app-course-general>
      <app-course-learned-skills [course]="course$ | async"></app-course-learned-skills>
      <app-course-description [course]="course$ | async"></app-course-description>
      <app-course-content [course]="course$ | async"></app-course-content>
    </div>
  `
})
export class CourseComponent implements OnInit {
  course$: Observable<LearnerCourseOverviewDto>;

  constructor(private store: Store<fromStore.LearningState>) {
  }

  ngOnInit() {
    this.course$ = this.store.select(fromStore.getCourseOverview);
  }

  onLearnButtonClick(courseId: string) {
    const path = `/learn/course/${courseId}`;

    this.store.dispatch(fromRouter.go({path: [path]}));
  }

  onGoBackClick() {
    this.store.dispatch(
      fromRouter.go({path: ['/workspace/my-courses']})
    );
  }
}
