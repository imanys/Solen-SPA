import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CourseInfoEditComponent} from './course-info-edit.component';

import * as fromGuards from '../../shared/guards';
import * as fromContainers from './containers';


const routes: Routes = [
  {
    path: '',
    component: CourseInfoEditComponent,
    canActivate: [
      fromGuards.CourseContentEditGuard
    ],
    children: [
      { path: '', redirectTo: 'general', pathMatch: 'full' },
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
          import('../course-content-edit/course-content-edit.module').then(
            mod => mod.CourseContentEditModule
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
          import('../course-learning-paths-edit/course-learning-paths-edit.module').then(
            mod => mod.CourseLearningPathsEditModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseInfoEditRoutingModule {}
