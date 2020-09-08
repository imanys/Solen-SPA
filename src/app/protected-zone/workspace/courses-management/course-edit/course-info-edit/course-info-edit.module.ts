import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CourseManagementSharedModule } from '../../shared/course-management-shared.module';
import {CourseInfoEditRoutingModule} from './course-info-edit-routing.module';

// module bootstrap
import { CourseInfoEditComponent } from './course-info-edit.component';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';


@NgModule({
  imports: [
    SharedModule,
    CourseManagementSharedModule,
    CourseInfoEditRoutingModule
  ],
  declarations: [
    CourseInfoEditComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class CourseInfoEditModule {}
