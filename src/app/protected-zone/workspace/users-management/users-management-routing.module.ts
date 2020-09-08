import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UsersManagementComponent} from './users-management.component';


const routes: Routes = [
  {
    path: '',
    component: UsersManagementComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./users-list/users-list.module').then(
            mod => mod.UsersListModule
          )
      },
      {
        path: ':userId',
        loadChildren: () =>
          import('./user-detail/user-detail.module').then(
            mod => mod.UserDetailModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersManagementRoutingModule {
}
