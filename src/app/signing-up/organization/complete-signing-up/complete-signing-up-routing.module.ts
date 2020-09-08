import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {CompleteSigningUpComponent} from './complete-signing-up.component';
import * as fromGuard from './guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [fromGuard.CheckSigningUpTokenGuard],
    component: CompleteSigningUpComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompleteSigningUpRoutingModule {
}
