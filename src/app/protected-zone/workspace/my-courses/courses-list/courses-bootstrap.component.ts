import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-courses-bootstrap',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['courses-bootstrap.component.scss'],
  template: `
    <section fxLayout="column" fxLayoutAlign="center center">
      <div fxLayout="column" fxLayoutAlign="center center"  fxLayoutGap="20px">
        <app-learning-path></app-learning-path>
        <app-courses></app-courses>
      </div>
    </section>
  `
})
export class CoursesBootstrapComponent {
}
