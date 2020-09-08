import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

import {CoursesListItemDto} from 'src/app/models/models';

@Component({
  selector: 'app-course-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-list-item.component.scss'],
  template: `
    <a
      [routerLink]="[
        '/workspace/courses-management/courses',
        course.id,
        'view'
      ]"
    >
      <mat-card>
        <mat-card-content>
          <div class="title">{{ course?.title }}</div>
          <div class="subtitle">{{ course?.subtitle }} </div>
          <div fxLayout fxLayoutGap="80px">
            <div class="info">
              <div class="label">Created by</div>
              <div>{{ course?.creator }}</div>
            </div>
            <div class="info">
              <div class="label">Date</div>
              <div>{{ course?.creationDate | date }}</div>
            </div>
            <div class="info">
              <div class="label">Duration</div>
              <div>{{ course?.duration | HoursMinuteSeconds }}</div>
            </div>
            <div class="info">
              <div class="label">Lecture count</div>
              <div>{{ course?.lectureCount }} Lecture(s)</div>
            </div>
            <div class="info">
              <div class="label">Status</div>
              <div>{{ course?.status }}</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </a>
  `
})
export class CourseListItemComponent {
  @Input() course: CoursesListItemDto;
}
