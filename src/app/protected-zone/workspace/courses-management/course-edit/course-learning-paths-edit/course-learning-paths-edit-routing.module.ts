import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CourseLearningPathsEditComponent} from './course-learning-paths-edit.component';

import * as fromGuards from '../../shared/guards';


const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'courses-management/courses'
    },
    component: CourseLearningPathsEditComponent,
    canActivate: [fromGuards.CourseContentGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseLearningPathsEditRoutingModule {}
