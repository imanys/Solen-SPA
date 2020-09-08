import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

import {fade} from 'src/app/shared/animations';

import {LearnerCourseOverviewDto} from 'src/app/models/models';

@Component({
  selector: 'app-course-content',
  styleUrls: ['course-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fade],
  template: `
    <div class="card">
      <div class="title" (click)="fade = fade === 'fadeIn' ? 'fadeOut' : 'fadeIn'">Course content</div>

      <div class="content" [@fade]="fade" fast>
        <div fxLayout fxLayoutGap="30%" fxLayoutAlign="end" class="course-recap">
      <span class="expand" (click)="onToggleExpanding()">{{
        expandAll ? 'Collapse all' : 'Expand all'
        }}</span>
          <span>{{ course.lectureCount }} lectures </span>
          <span>{{ course.duration | HoursMinuteSeconds }}</span>
        </div>
        <app-course-content-module
          *ngFor="let module of course.modules"
          [module]="module"
          [expanded]="expandAll"
        >
        </app-course-content-module>
      </div>

    </div>
  `
})
export class CourseContentComponent {
  @Input() course: LearnerCourseOverviewDto;
  expandAll = true;

  fade = 'fadeOut';

  onToggleExpanding() {
    this.expandAll = !this.expandAll;
  }
}
