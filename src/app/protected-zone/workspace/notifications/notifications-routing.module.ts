import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {NotificationsBootstrapComponent} from './notifications.component';
import * as fromContainers from './containers';


// ROUTES
const routes: Routes = [
  {
    path: '',
    component: NotificationsBootstrapComponent,
    children: [
      {
        path: '',
        component: fromContainers.NotificationsListContainerComponent
      },
      {
        path: ':notificationId',
        data: {
          breadcrumb: 'Notification'
        },
        component : fromContainers.NotificationDetailContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
