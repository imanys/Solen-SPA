import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import {LastCreatedCourseDto, LastPublishedCourseDto} from 'src/app/models';


@Component({
  selector: 'app-courses-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['courses-info.component.scss'],
  template: `

    <mat-card>
      <div class="header">
        <a [routerLink]="['/workspace/settings/organization']">
          <h2 class="title">Courses</h2>
        </a>
      </div>
      <div class="data-info">
        <span>Total courses </span> : {{courseCount}}
      </div>
      <div class="data-info">
        <span>Last created course </span> :  {{lastCreatedCourse.courseTitle}}
      </div>
      <div class="data-info">
        <span>Last published course </span> : {{lastPublishedCourse.courseTitle}}
      </div>
    </mat-card>

  `
})
export class CoursesInfoComponent {
  @Input() courseCount: number;
  @Input() lastCreatedCourse: LastCreatedCourseDto;
  @Input() lastPublishedCourse: LastPublishedCourseDto;
}

