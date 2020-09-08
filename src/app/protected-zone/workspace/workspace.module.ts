import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {NavigationModule} from './navigation/navigation.module';
import {UserDashboardModule} from './user-dashboard/user-dashboard.module';
import {NotificationsModule} from './notifications/notifications.module';


import {WorkspaceComponent} from './workspace.component';
import {WorkspaceRoutingModule} from './workspace-routing.module';


@NgModule({
  imports: [
    SharedModule,
    WorkspaceRoutingModule,
    NavigationModule,
    UserDashboardModule,
    NotificationsModule,
  ],
  declarations: [WorkspaceComponent],
})
export class WorkspaceModule {
}
