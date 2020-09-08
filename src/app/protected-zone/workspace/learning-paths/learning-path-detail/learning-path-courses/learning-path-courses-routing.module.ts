import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LearningPathCoursesComponent} from './learning-path-courses.component';

const routes: Routes = [
  {
    path: '',
    component: LearningPathCoursesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningPathCoursesRoutingModule {
}
