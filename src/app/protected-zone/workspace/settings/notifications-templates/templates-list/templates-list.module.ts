import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {TemplatesListRoutingModule} from './templates-list-routing.module';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

// module bootstrap
import {TemplatesListComponent} from './templates-list.component';


@NgModule({
  imports: [
    SharedModule,
    TemplatesListRoutingModule
  ],
  declarations: [
    TemplatesListComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class TemplatesListModule {
}
