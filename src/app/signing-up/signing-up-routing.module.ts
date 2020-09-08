import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {SigningUpComponent} from './signing-up.component';


const routes: Routes = [
  {
    path: '',
    component: SigningUpComponent,
    children: [
      {
        path: 'organization',
        loadChildren: () =>
          import('./organization/organization.module').then(
            mod => mod.OrganizationModule
          )
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user-signing-up/user-signing-up.module').then(
            mod => mod.UserSigningUpModule
          )
      },
      {path: '', redirectTo: 'organization'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigningUpRoutingModule {
}
