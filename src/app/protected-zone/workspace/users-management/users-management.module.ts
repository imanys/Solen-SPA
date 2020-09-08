import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {UsersManagementRoutingModule} from './users-management-routing.module';

// module bootstrap
import {UsersManagementComponent} from './users-management.component';


@NgModule({
  imports: [
    SharedModule,
    UsersManagementRoutingModule,
  ],
  declarations: [
    UsersManagementComponent,
  ]
})
export class UsersManagementModule {
}
