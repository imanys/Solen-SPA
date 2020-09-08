import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'courses',
        data: {
          breadcrumb: 'Instructor / Courses List',
          roles: ['Admin', 'Instructor']
        },
        pathMatch: 'full',
        loadChildren: () =>
          import('./courses/courses.module').then(
            mod => mod.CoursesModule
          )
      },
      {
        path: 'courses/:courseId/edit',
        data: {
          breadcrumb: 'Instructor / Course Edit'
        },
        loadChildren: () =>
          import(
            './course-edit/course-info-edit/course-info-edit.module'
            ).then(mod => mod.CourseInfoEditModule)
      },
      {
        path: 'courses/:courseId/view',
        data: {
          breadcrumb: 'Instructor / Course View'
        },
        loadChildren: () =>
          import(
            './course-view/course-info-view/course-info-view.module'
            ).then(mod => mod.CourseInfoViewModule)
      },
      {
        path: '', redirectTo: 'courses'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesManagementRoutingModule {}
