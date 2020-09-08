import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {LearningPathLearnersRoutingModule} from './learning-path-learners-routing.module';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

import {LearningPathLearnersComponent} from './learning-path-learners.component';


@NgModule({
  imports: [
    SharedModule,
    LearningPathLearnersRoutingModule,
  ],
  declarations: [
    LearningPathLearnersComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class LearningPathLearnersModule {
}
