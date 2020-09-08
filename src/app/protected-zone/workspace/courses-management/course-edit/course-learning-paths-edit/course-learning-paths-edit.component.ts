import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-course-learning-paths-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-learning-paths-edit.component.scss'],
  template: `
    <section>
      <mat-card>
        <mat-card-subtitle>Learning Paths</mat-card-subtitle>
        <app-learning-groups-edit></app-learning-groups-edit>
      </mat-card>
    </section>
  `
})
export class CourseLearningPathsEditComponent {}
