import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import * as fromGuards from './guards';
import {UsersListComponent} from './users-list.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [fromGuards.UsersGuard],
    data: {
      breadcrumb: 'Users'
    },
    component: UsersListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersListRoutingModule {
}
