import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {CourseManagementSharedModule} from '../../shared/course-management-shared.module';

import {CourseInfoViewRoutingModule} from './course-info-view-routing.module';

// module bootstrap
import {CourseInfoViewComponent} from './course-info-view.component';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';



@NgModule({
  imports: [
    SharedModule,
    CourseManagementSharedModule,
    CourseInfoViewRoutingModule
  ],
  declarations: [
    CourseInfoViewComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class CourseInfoViewModule {
}
