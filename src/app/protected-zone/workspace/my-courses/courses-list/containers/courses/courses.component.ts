import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from '../../../shared/store';

import {
  LearnerCourseAuthorFilterDto,
  LearnerCourseDto, LearnerCourseOrderByDto,
  LearnerCourseProgressDto,
  LearnerCoursesFilter,
} from 'src/app/models';


@Component({
  selector: 'app-courses',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['courses.component.scss'],
  template: `
    <div fxLayout="column" fxLayoutGap="20px" fxLayoutAlign="center">
      <app-courses-filters [currentFilter]="currentFilter$ | async" [orderBys]="orderBys$ | async"
                           [authors]="authors$ | async"
                           (filterUpdated)="onFilterUpdated($event)"
                           (filterReset)="onFilterReset()"></app-courses-filters>
      <app-courses-list [courses]="courses$ | async"
                        [totalItems]="total$ | async"
                        [currentFilter]="currentFilter$ | async"
                        [coursesProgress]="coursesProgress$ | async"
                        (pageChanged)="onPageChanged($event)">
      </app-courses-list>
    </div>

  `
})
export class CoursesComponent implements OnInit {
  courses$: Observable<LearnerCourseDto[]>;
  coursesProgress$: Observable<LearnerCourseProgressDto[]>;
  total$: Observable<number>;
  orderBys$: Observable<LearnerCourseOrderByDto[]>;
  authors$: Observable<LearnerCourseAuthorFilterDto[]>;
  currentFilter$: Observable<LearnerCoursesFilter>;

  constructor(private store: Store<fromStore.LearningState>) {
  }

  ngOnInit() {
    this.courses$ = this.store.select(fromStore.getCourses);
    this.coursesProgress$ = this.store.select(fromStore.getCoursesProgress);
    this.total$ = this.store.select(fromStore.getTotalCourses);
    this.orderBys$ = this.store.select(fromStore.getOrderBys);
    this.authors$ = this.store.select(fromStore.getAuthors);
    this.currentFilter$ = this.store.select(fromStore.getCurrentFilter);
  }

  onFilterUpdated(event: LearnerCoursesFilter) {
    this.store.dispatch(fromStore.updateCurrentFilter(event));
  }

  onFilterReset() {
    this.store.dispatch(fromStore.resetCurrentFilter());
  }

  onPageChanged(event: LearnerCoursesFilter) {
    this.store.dispatch(fromStore.updateCurrentFilter(event));
  }
}
