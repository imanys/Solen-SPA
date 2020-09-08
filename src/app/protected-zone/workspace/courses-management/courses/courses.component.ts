import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-courses',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['courses.component.scss'],
  template: `
    <section fxLayout="column" fxLayoutAlign="center center">
      <div fxLayout="row" fxLayoutAlign="center">
        <app-course-creation></app-course-creation>
      </div>
      <div fxLayout="column" fxLayoutAlign="center center">
        <app-courses-list></app-courses-list>
      </div>
    </section>
  `
})
export class CoursesComponent {
}
