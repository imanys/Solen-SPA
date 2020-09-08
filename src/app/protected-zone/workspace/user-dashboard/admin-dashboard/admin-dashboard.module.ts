import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {DashboardSharedModule} from '../shared/dashboard-shared.module';
import {AdminDashboardRoutingModule} from './admin-dashboard-routing.module';

import {AdminDashboardComponent} from './admin-dashboard.component';

// containers
import * as fromContainers from './containers';

@NgModule({
  imports: [
    SharedModule,
    DashboardSharedModule,
    AdminDashboardRoutingModule,
  ],
  declarations: [AdminDashboardComponent, ...fromContainers.containers]
})
export class AdminDashboardModule {
}
