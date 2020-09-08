import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CourseManagementSharedModule } from '../shared/course-management-shared.module';

// module bootstrap
import { CoursePreviewComponent } from './course-preview.component';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';
import {CoursePreviewRoutingModule} from './course-preview-routing.module';



@NgModule({
  imports: [
    SharedModule,
    CourseManagementSharedModule,
    CoursePreviewRoutingModule
  ],
  declarations: [
    CoursePreviewComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class CoursePreviewModule {}
