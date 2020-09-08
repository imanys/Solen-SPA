import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { MyCoursesSharedModule } from '../shared/my-courses-shared.module';

// guards
import * as fromGuards from '../shared/guards';

// module bootstrap
import { CourseOverviewComponent } from './course-overview.component';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

// ROUTES
const ROUTES: Routes = [
  {
    path: '',
    component: CourseOverviewComponent,
    canActivate: [fromGuards.CourseOverviewGuard]
  }
];

@NgModule({
  imports: [SharedModule, MyCoursesSharedModule, RouterModule.forChild(ROUTES)],
  declarations: [
    CourseOverviewComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class CourseOverviewModule {}
