import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CoursePreviewComponent} from './course-preview.component';

import * as fromGuards from '../shared/guards';


const routes: Routes = [
  {
    path: '',
    component: CoursePreviewComponent,
    canActivate: [fromGuards.CourseContentGuard]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursePreviewRoutingModule {}
