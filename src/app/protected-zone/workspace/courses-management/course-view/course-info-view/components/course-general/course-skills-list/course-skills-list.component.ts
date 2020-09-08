import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CourseDto } from 'src/app/models';

@Component({
  selector: 'app-course-skills-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-skills-list.component.scss'],
  template: `
    <mat-card *ngIf="course?.courseLearnedSkills?.length > 0">
      <mat-card-subtitle
        >The skills learned at the end of the course :</mat-card-subtitle
      >
      <mat-card-content
        fxLayout="column"
        fxLayoutGap="10px"
        fxLayoutAlign="center center"
      >
        <mat-list>
          <mat-list-item *ngFor="let skill of course.courseLearnedSkills">
            <mat-icon mat-list-icon>check</mat-icon>
            <h4 mat-line>{{ skill.name }}</h4>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `
})
export class CourseSkillsListComponent {
  @Input() course: CourseDto;
}
