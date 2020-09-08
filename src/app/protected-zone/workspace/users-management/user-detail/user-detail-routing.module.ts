import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import * as fromGuards from './guards';
import {UserDetailComponent} from './user-detail.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [fromGuards.UserGuard],
    data: {
      breadcrumb: 'Users'
    },
    component: UserDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailRoutingModule {
}
