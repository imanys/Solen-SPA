import {Component, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-learning-paths',
  styleUrls: ['learning-paths.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section fxLayout="column" fxLayoutGap="10px" fxLayoutAlign="center center">
      <div>
        <router-outlet></router-outlet>
      </div>

    </section>
  `
})
export class LearningPathsComponent {
}
