import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {InitSigningUpComponent} from './init-signing-up.component';


const routes: Routes = [
  {
    path: '',
    component: InitSigningUpComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitSigningUpRoutingModule {
}
