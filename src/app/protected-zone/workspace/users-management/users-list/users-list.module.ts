import {NgModule} from '@angular/core';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {SharedModule} from 'src/app/shared/shared.module';

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

import {UsersListRoutingModule} from './users-list-routing.module';
import {UsersListComponent} from './users-list.component';


@NgModule({
  imports: [
    SharedModule,
    UsersListRoutingModule,
    StoreModule.forFeature('users', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    UsersListComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  entryComponents: [...fromComponents.entryComponents],
  providers: [...fromServices.services, ...fromGuards.guards]
})
export class UsersListModule {
}
