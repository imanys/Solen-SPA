import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';
import {AuthComponent} from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: fromContainers.LoginComponent
      },
      {
        path: 'forgotPassword',
        component: fromContainers.ForgotPasswordContainerComponent
      },
      {
        path: 'reset',
        canActivate: [fromGuards.CheckPasswordTokenGuard],
        component: fromContainers.ResetPasswordContainerComponent
      },
      {
        path: '', redirectTo: 'login'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
