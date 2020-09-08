import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';

import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from '../../../shared/store';

import {
  CoursesListItemDto,
  CoursesManagementAuthorFilterDto,
  CoursesManagementOrderByDto,
  LearningPathFilterDto,
  StatusFilterDto
} from 'src/app/models/models';
import {CoursesFilter} from '../../../../../../models';

@Component({
  selector: 'app-courses-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['courses-list.component.scss'],
  template: `
    <div
      class="courses__list"
      fxLayout="column"
      fxLayoutGap="20px"
      fxLayoutAlign="center"
    >
      <app-courses-filters [orderBys]="orderBys$ | async" [authors]="authors$ | async"
                           [learningPaths]="learningPaths$ | async" [status]="status$ | async"
                           [currentFilter]="currentFilter"
                           (filterUpdated)="onFilterUpdated($event)"
                           (filterReset)="onFilterReset()">
      </app-courses-filters>
      <app-course-list-item
        *ngFor="let course of (courses$ | async) | paginate: { itemsPerPage: currentFilter.pageSize, currentPage: currentFilter.page,  totalItems:  (totalItems$ | async) }"
        [course]="course"
      >
      </app-course-list-item>
      <div fxLayout fxLayoutAlign="center">
        <pagination-controls (pageChange)="onPageChange($event)" [autoHide]="true"></pagination-controls>
      </div>
      <div *ngIf="(courses$ |async).length == 0">
        <mat-card>
          <mat-card-content fxLayout fxLayoutAlign="center">
            No course found.
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class CoursesListComponent implements OnInit, OnDestroy {
  courses$: Observable<CoursesListItemDto[]>;
  orderBys$: Observable<CoursesManagementOrderByDto[]>;
  learningPaths$: Observable<LearningPathFilterDto[]>;
  authors$: Observable<CoursesManagementAuthorFilterDto[]>;
  status$: Observable<StatusFilterDto[]>;
  currentFilter: CoursesFilter;
  currentFilterSubscription: Subscription;
  totalItems$: Observable<number>;

  constructor(
    private store: Store<fromStore.CourseManagementState>
  ) {
  }

  ngOnInit() {
    this.courses$ = this.store.select(fromStore.getCourses);
    this.orderBys$ = this.store.select(fromStore.getOrderBys);
    this.learningPaths$ = this.store.select(fromStore.getLearningPaths);
    this.authors$ = this.store.select(fromStore.getAuthors);
    this.status$ = this.store.select(fromStore.getStatus);
    this.totalItems$ = this.store.select(fromStore.getTotalCourses);

    this.currentFilterSubscription = this.store.select(fromStore.getCurrentFilter)
      .subscribe(filter => this.currentFilter = filter);
  }

  onFilterUpdated(event: CoursesFilter) {
    this.store.dispatch(fromStore.updateCurrentFilter(event));
  }

  onFilterReset() {
    this.store.dispatch(fromStore.resetCurrentFilter());
  }

  onPageChange(page: number) {
    this.store.dispatch(fromStore.updateCurrentFilter({...this.currentFilter, page}));
  }

  ngOnDestroy() {
    if (this.currentFilterSubscription) {
      this.currentFilterSubscription.unsubscribe();
    }
  }
}
