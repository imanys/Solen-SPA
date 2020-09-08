import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CoursesComponent} from './courses.component';

import * as fromGuards from '../shared/guards';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    canActivate: [fromGuards.CoursesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {}
