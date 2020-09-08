import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {LearningPathsListComponent} from './learning-paths-list.component';


const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Learning paths'
    },
    component: LearningPathsListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningPathsListRoutingModule {
}
