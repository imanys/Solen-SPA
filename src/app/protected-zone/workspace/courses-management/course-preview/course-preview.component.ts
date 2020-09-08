import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-course-preview-main',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-preview.component.scss'],
  template: `
    <section>
      <app-course-preview></app-course-preview>
    </section>
  `
})
export class CoursePreviewComponent {}
