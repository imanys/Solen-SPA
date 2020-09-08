import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {SharedModule} from 'src/app/shared/shared.module';
import {OrganizationRoutingModule} from './organization-routing.module';

import {OrganizationComponent} from './organization.component';

// store
import {reducers, effects} from './store';

// services
import * as fromServices from './services';

// guards
import * as fromGuards from './guards';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';


@NgModule({
  imports: [
    SharedModule,
    OrganizationRoutingModule,
    StoreModule.forFeature('organization-settings', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    OrganizationComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  providers: [...fromServices.services, ...fromGuards.guards]
})
export class OrganizationModule {
}
