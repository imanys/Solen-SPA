import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {OrganizationComponent} from './organization.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    children: [
      {
        path: 'init',
        loadChildren: () =>
          import('./init-signing-up/init-signing-up.module').then(
            mod => mod.InitSigningUpModule
          )
      },
      {
        path: 'complete',
        loadChildren: () =>
          import('./complete-signing-up/complete-signing-up.module').then(
            mod => mod.CompleteSigningUpModule
          )
      },
      {path: '', redirectTo: 'init'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {
}
