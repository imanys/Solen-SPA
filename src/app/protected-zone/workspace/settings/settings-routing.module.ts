import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SettingsComponent} from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'notifications',
        data: {
          breadcrumb: 'Settings / Notifications'
        },
        loadChildren: () =>
          import('./notifications-templates/notifications-templates.module').then(
            mod => mod.NotificationsTemplatesModule
          )
      },
      {
        path: 'organization',
        data: {
          breadcrumb: 'Settings / Organization'
        },
        loadChildren: () =>
          import('./organization/organization.module').then(
            mod => mod.OrganizationModule
          )
      },
      {path: '', redirectTo: 'organization', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
