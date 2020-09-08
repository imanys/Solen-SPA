import {Component, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-learning-path-learners-bootstrap',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-learning-path-learners-container></app-learning-path-learners-container>
  `
})
export class LearningPathLearnersComponent {

}
