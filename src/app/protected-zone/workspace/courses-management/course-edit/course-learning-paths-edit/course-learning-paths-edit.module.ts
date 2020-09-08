import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CourseManagementSharedModule } from '../../shared/course-management-shared.module';
import {CourseLearningPathsEditRoutingModule} from './course-learning-paths-edit-routing.module';


// module bootstrap
import { CourseLearningPathsEditComponent } from './course-learning-paths-edit.component';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';


@NgModule({
  imports: [
    SharedModule,
    CourseManagementSharedModule,
    CourseLearningPathsEditRoutingModule
  ],
  declarations: [
    CourseLearningPathsEditComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class CourseLearningPathsEditModule {}
