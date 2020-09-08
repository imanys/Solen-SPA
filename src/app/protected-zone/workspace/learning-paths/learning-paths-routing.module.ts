import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LearningPathsComponent} from './learning-paths.component';

import * as fromGuards from './shared/guards';

const routes: Routes = [
  {
    path: '',
    component: LearningPathsComponent,
    canActivate: [fromGuards.LearningPathsGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./learning-paths-list/learning-paths-list.module').then(
            mod => mod.LearningPathsListModule
          )
      },
      {
        path: ':learningPathId',
        canActivate: [fromGuards.LearningPathExistGuard],
        loadChildren: () =>
          import('./learning-path-detail/learning-path-detail.module').then(
            mod => mod.LearningPathDetailModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningPathsRoutingModule {
}
