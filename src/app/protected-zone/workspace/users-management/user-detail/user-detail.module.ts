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

import {UserDetailRoutingModule} from './user-detail-routing.module';
import {UserDetailComponent} from './user-detail.component';


@NgModule({
  imports: [
    SharedModule,
    UserDetailRoutingModule,
    StoreModule.forFeature('user-detail', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    UserDetailComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ],

  providers: [...fromServices.services, ...fromGuards.guards]
})
export class UserDetailModule {
}
