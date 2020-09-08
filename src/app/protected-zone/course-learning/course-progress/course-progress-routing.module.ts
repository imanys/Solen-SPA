import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CourseProgressComponent} from './course-progress.component';

import * as fromGuards from './guards';
import * as fromContainers from './containers';


// ROUTES
const routes: Routes = [
  {
    path: '',
    component: CourseProgressComponent,
    canActivate: [fromGuards.CourseGuard],
    children: [
      {
        path: 'lecture/:lectureId',
        component: fromContainers.CurrentLectureComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseProgressRoutingModule {}
