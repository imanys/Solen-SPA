import {NgModule} from '@angular/core';

import {OrganizationRoutingModule} from './organization-routing.module';
import {OrganizationComponent} from './organization.component';


@NgModule({
  imports: [
    OrganizationRoutingModule
  ],
  declarations: [OrganizationComponent]

})
export class OrganizationModule {
}
