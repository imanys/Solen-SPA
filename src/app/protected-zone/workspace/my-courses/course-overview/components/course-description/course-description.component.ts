import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

import {fade} from 'src/app/shared/animations';

import {LearnerCourseOverviewDto} from 'src/app/models/models';

@Component({
  selector: 'app-course-description',
  styleUrls: ['course-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ fade ],
  template: `
    <div class="card" *ngIf="course.description">

      <div class="title" (click)="fade = fade === 'fadeIn' ? 'fadeOut' : 'fadeIn'">Description</div>
      <div class="content"[@fade]="fade">
        <app-text-display
          [text]="course?.description"
        ></app-text-display>
      </div>

    </div>
  `
})
export class CourseDescriptionComponent {
  @Input() course: LearnerCourseOverviewDto;

  fade = 'fadeOut';
}
