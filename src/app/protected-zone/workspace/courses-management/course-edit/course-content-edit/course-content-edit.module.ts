import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CourseManagementSharedModule } from '../../shared/course-management-shared.module';

import {CourseContentEditRoutingModule} from './course-content-edit-routing.module';

// module bootstrap
import { CourseContentEditComponent } from './course-content-edit.component';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';


@NgModule({
  imports: [
    SharedModule,
    CourseContentEditRoutingModule,
    CourseManagementSharedModule,
  ],
  declarations: [
    CourseContentEditComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class CourseContentEditModule {}
