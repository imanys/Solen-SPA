import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

import {LearnerCourseDto} from 'src/app/models/models';

@Component({
  selector: 'app-course-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-list-item.component.scss'],
  template: `

    <mat-card>
      <mat-card-content>
        <a [routerLink]="['/workspace/my-courses/course', course.id, 'overview']">
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
              <div class="label">Progress</div>
              <div style="position: relative">
                <mat-progress-bar mode="determinate" [value]="progress"></mat-progress-bar>
                <span>{{progress}}%</span>
              </div>
            </div>
          </div>
        </a>
        <div fxLayout fxLayoutAlign="end" class="learn">
          <a mat-flat-button color="accent" [routerLink]="['/learn/course', course.id]">Learn</a>
        </div>
      </mat-card-content>
    </mat-card>

  `
})
export class CourseListItemComponent {
  @Input() course: LearnerCourseDto;
  @Input() completedDuration: number;


  get progress() {
    return ((this.completedDuration / this.course?.duration) * 100).toFixed();
  }
}
