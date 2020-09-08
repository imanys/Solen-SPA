import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {LearningPathCoursesRoutingModule} from './learning-path-courses-routing.module';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

import {LearningPathCoursesComponent} from './learning-path-courses.component';


@NgModule({
  imports: [
    SharedModule,
    LearningPathCoursesRoutingModule,
  ],
  declarations: [
    LearningPathCoursesComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  entryComponents: [...fromComponents.entryComponents]
})
export class LearningPathCoursesModule {
}
