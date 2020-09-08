import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CourseLearningPathsViewComponent} from './course-learning-paths-view.component';

import * as fromGuards from '../../shared/guards';


const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'courses-management/courses'
    },
    component: CourseLearningPathsViewComponent,
    canActivate: [fromGuards.CourseContentGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseLearningPathsViewRoutingModule {}
