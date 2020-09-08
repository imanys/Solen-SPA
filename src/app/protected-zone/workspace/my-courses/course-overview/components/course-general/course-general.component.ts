import {Component, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

import {LearnerCourseOverviewDto} from 'src/app/models/models';

@Component({
  selector: 'app-course-general',
  styleUrls: ['course-general.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
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
      </div>
      <div fxLayout fxLayoutAlign="end">
        <button mat-raised-button color="accent" (click)="onLearnButtonClick()">
          Learn
        </button>
      </div>
    </div>
  `
})
export class CourseGeneralComponent {
  @Input() course: LearnerCourseOverviewDto;
  @Output() learnButtonClicked = new EventEmitter<string>();

  onLearnButtonClick() {
    this.learnButtonClicked.emit(this.course.id);
  }
}
