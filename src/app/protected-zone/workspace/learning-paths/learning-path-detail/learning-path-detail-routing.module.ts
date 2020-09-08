import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import * as fromGuards from '../shared/guards';

import {LearningPathDetailComponent} from './learning-path-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LearningPathDetailComponent,
    children: [
      {
        path: 'info',
        data: {
          breadcrumb: 'Learning path / Info'
        },
        loadChildren: () =>
          import('./learning-path-info/learning-path-info.module').then(
            mod => mod.LearningPathInfoModule
          )
      },
      {
        path: 'courses',
        data: {
          breadcrumb: 'Learning path / Courses'
        },
        canActivate: [fromGuards.LearningPathCoursesGuard],
        loadChildren: () =>
          import('./learning-path-courses/learning-path-courses.module').then(
            mod => mod.LearningPathCoursesModule
          )
      },
      {
        path: 'learners',
        data: {
          breadcrumb: 'Learning path / Learners'
        },
        canActivate: [fromGuards.LearningPathLearnersGuard],
        loadChildren: () =>
          import('./learning-path-learners/learning-path-learners.module').then(
            mod => mod.LearningPathLearnersModule
          )
      },
      {path: '', redirectTo: 'info', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningPathDetailRoutingModule {
}
