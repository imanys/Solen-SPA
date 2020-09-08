import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import * as fromAuhGuards from '../../auth/guards';
import {WorkspaceComponent} from './workspace.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [fromAuhGuards.AuthGuard],
    component: WorkspaceComponent,
    children: [
      {
        path: 'dashboard',
        data: {
          breadcrumb: 'Dashboard'
        },
        loadChildren: () =>
          import('./user-dashboard/user-dashboard.module').then(
            mod => mod.UserDashboardModule
          )
      },
      {
        path: 'notifications',
        data: {
          breadcrumb: 'Notifications'
        },
        loadChildren: () =>
          import('./notifications/notifications.module').then(
            mod => mod.NotificationsModule
          )
      },
      {
        path: 'courses-management',
        loadChildren: () =>
          import('./courses-management/courses-management.module').then(
            mod => mod.CoursesManagementModule
          )
      },
      {
        path: 'my-courses',
        loadChildren: () =>
          import('./my-courses/my-courses.module').then(
            mod => mod.MyCoursesModule
          )
      },
      {
        path: 'learning-paths',
        loadChildren: () =>
          import('./learning-paths/learning-paths.module').then(
            mod => mod.LearningPathsModule
          )
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users-management/users-management.module').then(
            mod => mod.UsersManagementModule
          )
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then(
            mod => mod.SettingsModule
          )
      },
      {
        path: 'my-profile',
        data: {
          breadcrumb: 'My Profile'
        },
        loadChildren: () =>
          import('./my-profile/my-profile.module').then(
            mod => mod.MyProfileModule
          )
      },

      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {
        path: '**', redirectTo: 'dashboard'
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule {
}
