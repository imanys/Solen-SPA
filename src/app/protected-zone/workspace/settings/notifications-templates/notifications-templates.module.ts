import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {NotificationsTemplatesSharedModule} from './shared/notifications-templates-shared.module';
import {NotificationsTemplatesRoutingModule} from './notifications-templates-routing.module';

// module bootstrap
import {NotificationsTemplatesComponent} from './notifications-templates.component';


@NgModule({
  imports: [
    SharedModule,
    NotificationsTemplatesRoutingModule,
    NotificationsTemplatesSharedModule
  ],
  declarations: [
    NotificationsTemplatesComponent,
  ]
})
export class NotificationsTemplatesModule {
}
