import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {LearningPathInfoRoutingModule} from './learning-path-info-routing.module';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

import {LearningPathInfoComponent} from './learning-path-info.component';


@NgModule({
  imports: [
    SharedModule,
    LearningPathInfoRoutingModule,
  ],
  declarations: [
    LearningPathInfoComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ],
})
export class LearningPathInfoModule {
}
