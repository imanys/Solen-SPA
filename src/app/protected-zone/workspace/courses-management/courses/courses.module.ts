import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CourseManagementSharedModule } from '../shared/course-management-shared.module';
import {CoursesRoutingModule} from './courses-routing.module';

// module bootstrap
import { CoursesComponent } from './courses.component';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';


@NgModule({
  imports: [
    SharedModule,
    CourseManagementSharedModule,
    CoursesRoutingModule
  ],
  declarations: [
    CoursesComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  entryComponents: [...fromComponents.entryComponents]
})
export class CoursesModule {}
