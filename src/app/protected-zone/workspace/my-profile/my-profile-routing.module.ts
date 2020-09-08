import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MyProfileComponent} from './my-profile.component';

import * as fromGuards from './guards';
import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: '',
    component: MyProfileComponent,
    children: [
      {
        path: 'display',
        canActivate: [fromGuards.UserGuard],
        component: fromContainers.UserDisplayInfoContainerComponent
      },
      {
        path: 'password',
        component: fromContainers.UserPasswordContainerComponent
      },
      {path: '', redirectTo: 'display', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProfileRoutingModule {
}
