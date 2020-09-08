import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {UserSigningUpComponent} from './user-signing-up.component';
import * as fromGuard from './guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [fromGuard.CheckSigningUpTokenGuard],
    component: UserSigningUpComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSigningUpRoutingModule {
}
