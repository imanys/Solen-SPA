import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {SharedModule} from 'src/app/shared/shared.module';
import {MyProfileRoutingModule} from './my-profile-routing.module';

import {MyProfileComponent} from './my-profile.component';

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
    MyProfileRoutingModule,
    StoreModule.forFeature('my-profile', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    MyProfileComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  providers: [...fromServices.services, ...fromGuards.guards]
})
export class MyProfileModule {
}
