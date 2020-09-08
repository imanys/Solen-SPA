import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CourseManagementSharedModule } from '../../shared/course-management-shared.module';

import {CourseLearningPathsViewRoutingModule} from './course-learning-paths-view-routing.module';

// module bootstrap
import {CourseLearningPathsViewComponent } from './course-learning-paths-view.component';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';



@NgModule({
  imports: [
    SharedModule,
    CourseManagementSharedModule,
    CourseLearningPathsViewRoutingModule
  ],
  declarations: [
    CourseLearningPathsViewComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class CourseLearningPathsViewModule {}
