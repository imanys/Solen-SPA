import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LearningPathLearnersComponent} from './learning-path-learners.component';

const routes: Routes = [
  {
    path: '',
    component: LearningPathLearnersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningPathLearnersRoutingModule {
}
