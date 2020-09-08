import {Component, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-learning-path-info-bootstrap',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-learning-path-info-container></app-learning-path-info-container>
  `
})
export class LearningPathInfoComponent {

}
