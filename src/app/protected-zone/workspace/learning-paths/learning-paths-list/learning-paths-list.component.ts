import {Component, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-learning-paths-list-bootstrap',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div fxLayout="row" fxLayoutAlign="center">
      <app-learning-path-creation-container></app-learning-path-creation-container>
    </div>

    <app-learning-paths-list-container></app-learning-paths-list-container>
  `
})
export class LearningPathsListComponent {

}
