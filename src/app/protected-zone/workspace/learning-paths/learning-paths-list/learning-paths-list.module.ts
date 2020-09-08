import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {LearningPathsListRoutingModule} from './learning-paths-list-routing.module';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

import {LearningPathsListComponent} from './learning-paths-list.component';


@NgModule({
  imports: [
    SharedModule,
    LearningPathsListRoutingModule,
  ],
  declarations: [
    LearningPathsListComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  entryComponents: [...fromComponents.entryComponents]
})
export class LearningPathsListModule {
}
