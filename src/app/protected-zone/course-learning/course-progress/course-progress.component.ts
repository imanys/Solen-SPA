import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-course-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['course-progress.component.scss'],
  template: `
    <section fxLayout fxLayoutGap="5px">
      <div fxFlex="65">
        <router-outlet></router-outlet>
      </div>
      <div fxFlex="35">
        <app-course-content></app-course-content>
      </div>

    </section>
  `
})
export class CourseProgressComponent {
}
