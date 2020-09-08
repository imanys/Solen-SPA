import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CourseContentEditComponent} from './course-content-edit.component';

import * as fromGuards from '../../shared/guards';


const routes: Routes = [
  {
    path: '',
    component: CourseContentEditComponent,
    canActivate: [fromGuards.CourseContentGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseContentEditRoutingModule {
}
