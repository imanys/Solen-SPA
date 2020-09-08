import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-course-learning-paths-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-learning-paths-view.component.scss'],
  template: `
    <section>
      <mat-card>
        <mat-card-subtitle>Learning Paths</mat-card-subtitle>
        <app-course-learning-paths></app-course-learning-paths>
      </mat-card>
    </section>
  `
})
export class CourseLearningPathsViewComponent {}
