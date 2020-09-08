import {Component, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-learning-path-courses-bootstrap',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-learning-path-courses-container></app-learning-path-courses-container>
  `
})
export class LearningPathCoursesComponent {

}
