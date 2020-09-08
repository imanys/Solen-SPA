import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {NotificationsTemplatesComponent} from './notifications-templates.component';
import * as fromGuards from './shared/guards';


const routes: Routes = [
  {
    path: '',
    component: NotificationsTemplatesComponent,
    canActivate: [fromGuards.TemplatesGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./templates-list/templates-list.module').then(
            mod => mod.TemplatesListModule
          )
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsTemplatesRoutingModule {
}
