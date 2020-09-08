import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthModule} from 'src/app/auth/auth.module';
import * as fromAuhGuards from '../../auth/guards';

import {CourseLearningComponent} from './course-learning.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [fromAuhGuards.AuthGuard],
    canActivateChild: [fromAuhGuards.AuthGuard],
    component: CourseLearningComponent,
    children: [
      {
        path: 'course/:courseId',
        loadChildren: () =>
          import('./course-progress/course-progress.module').then(
            mod => mod.CourseProgressModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [AuthModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseLearningRoutingModule {}
