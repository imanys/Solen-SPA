import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TemplatesListComponent} from './templates-list.component';

const routes: Routes = [
  {
    path: '',
    component: TemplatesListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesListRoutingModule {
}
