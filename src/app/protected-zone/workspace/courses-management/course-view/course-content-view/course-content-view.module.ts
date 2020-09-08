import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CourseManagementSharedModule } from '../../shared/course-management-shared.module';
import {CourseContentViewRoutingModule} from './course-content-view-routing.module';


// module bootstrap
import { CourseContentViewComponent } from './course-content-view.component';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';




@NgModule({
  imports: [
    SharedModule,
    CourseManagementSharedModule,
    CourseContentViewRoutingModule
  ],
  declarations: [
    CourseContentViewComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class CourseContentViewModule {}
