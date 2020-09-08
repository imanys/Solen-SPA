import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

import {fade} from 'src/app/shared/animations';

import {LearnerCourseOverviewDto} from 'src/app/models/models';

@Component({
  selector: 'app-course-learned-skills',
  styleUrls: ['course-learned-skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ fade ],
  template: `
    <div class="card" *ngIf="course.courseLearnedSkills.length > 0">

      <div class="title" (click)="fade = fade === 'fadeIn' ? 'fadeOut' : 'fadeIn'">What will you learn</div>
      <div class="content" [@fade]="fade">
        <mat-list>
          <mat-list-item *ngFor="let skill of course.courseLearnedSkills">
            <mat-icon mat-list-icon>check</mat-icon>
            <h4 mat-line>{{ skill.name }}</h4>
          </mat-list-item>
        </mat-list>
      </div>

    </div>
  `
})
export class CourseLearnedSkillsComponent {
  @Input() course: LearnerCourseOverviewDto;

  fade = 'fadeOut';
}
