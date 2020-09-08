import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { MyCoursesSharedModule } from '../shared/my-courses-shared.module';

// guards
import * as fromGuards from '../shared/guards';

// module bootstrap
import { CoursesBootstrapComponent } from './courses-bootstrap.component';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

// ROUTES
const ROUTES: Routes = [
  {
    path: '',
    component: CoursesBootstrapComponent,
    canActivate: [fromGuards.CoursesGuard]
  }
];

@NgModule({
  imports: [SharedModule, MyCoursesSharedModule, RouterModule.forChild(ROUTES)],
  declarations: [
    CoursesBootstrapComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class CoursesModule {}
