import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import * as fromGuards from './guards';

import {OrganizationComponent} from './organization.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    canActivate: [fromGuards.OrganizationInfoGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {
}
