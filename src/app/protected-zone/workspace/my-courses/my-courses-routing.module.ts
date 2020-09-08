import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: {
          breadcrumb: 'My Courses'
        },
        pathMatch: 'full',
        loadChildren: () =>
          import('./courses-list/courses.module').then(
            mod => mod.CoursesModule
          )
      },
      {
        path: 'course/:courseId/overview',
        data: {
          breadcrumb: 'Learning / Course'
        },
        pathMatch: 'full',
        loadChildren: () =>
          import('./course-overview/course-overview.module').then(
            mod => mod.CourseOverviewModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCoursesRoutingModule {}
