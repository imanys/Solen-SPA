import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CourseInfoViewComponent} from './course-info-view.component';

import * as fromGuards from '../../shared/guards';
import * as fromContainers from './containers';


const routes: Routes = [
  {
    path: '',
    component: CourseInfoViewComponent,
    canActivate: [
      fromGuards.CourseContentGuard
    ],
    children: [
      {path: '', redirectTo: 'general', pathMatch: 'full'},
      {
        path: 'general',
        component: fromContainers.CourseGeneralComponent
      },
      {
        path: 'errors',
        component: fromContainers.CourseErrorsComponent
      },
      {
        path: 'content',
        loadChildren: () =>
          import('../course-content-view/course-content-view.module').then(
            mod => mod.CourseContentViewModule
          )
      },
      {
        path: 'preview',
        loadChildren: () =>
          import('../../course-preview/course-preview.module').then(
            mod => mod.CoursePreviewModule
          )
      },
      {
        path: 'learning-paths',
        loadChildren: () =>
          import('../course-learning-paths-view/course-learning-paths-view.module').then(
            mod => mod.CourseLearningPathsViewModule
          )
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseInfoViewRoutingModule {}
