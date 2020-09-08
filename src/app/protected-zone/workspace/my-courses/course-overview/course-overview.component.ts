import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-course-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-overview.component.scss'],
  template: `
    <section fxLayout="column" fxLayoutAlign="center center">
      <app-course></app-course>
    </section>
  `
})
export class CourseOverviewComponent {}
