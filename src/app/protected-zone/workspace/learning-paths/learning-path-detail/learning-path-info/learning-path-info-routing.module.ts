import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LearningPathInfoComponent} from './learning-path-info.component';

const routes: Routes = [
  {
    path: '',
    component: LearningPathInfoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningPathInfoRoutingModule {
}
