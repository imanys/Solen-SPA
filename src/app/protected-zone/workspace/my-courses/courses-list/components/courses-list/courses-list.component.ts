import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

import {LearnerCourseDto, LearnerCourseProgressDto, LearnerCoursesFilter} from 'src/app/models';

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
      <app-course-list-item
        *ngFor="let course of courses | paginate: { itemsPerPage: currentFilter.pageSize, currentPage: currentFilter.page,  totalItems:  totalItems }"
        [course]="course"
        [completedDuration]="getCompletedDuration(course.id)"
      >
      </app-course-list-item>
      <div fxLayout fxLayoutAlign="center">
        <pagination-controls (pageChange)="onPageChange($event)" [autoHide]="true"></pagination-controls>
      </div>
      <div *ngIf="courses.length == 0">
        <mat-card>
          <mat-card-content fxLayout fxLayoutAlign="center">
            No course found.
          </mat-card-content>
        </mat-card>
      </div>
    </div>

  `
})
export class CoursesListComponent {
  @Input() courses: LearnerCourseDto[];
  @Input() coursesProgress: LearnerCourseProgressDto[];
  @Input() totalItems: number;
  @Input() currentFilter: LearnerCoursesFilter;

  @Output() pageChanged = new EventEmitter<LearnerCoursesFilter>();


  onPageChange(event: number) {
    this.pageChanged.emit({...this.currentFilter, page: event});
  }

  getCompletedDuration(courseId: string): number {
    return this.coursesProgress.find(x => x.courseId === courseId)?.duration;
  }
}
