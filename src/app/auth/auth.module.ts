import {NgModule} from '@angular/core';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {SharedModule} from 'src/app/shared/shared.module';
import {AuthRoutingModule} from './auth-routing.module';
import {NavigationModule} from './navigation/navigation.module';
import {NotificationsModule} from '../protected-zone/workspace/notifications/notifications.module'


import {effects, reducers} from './store';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

// guards
import * as fromGuards from './guards';

// services
import * as fromServices from './services';

// directives
import * as fromDirectives from './directives';

import {AuthComponent} from './auth.component';
;

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    NavigationModule,
    NotificationsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  declarations: [
    AuthComponent,
    ...fromContainers.containers,
    ...fromComponents.components,
    ...fromDirectives.directives
  ],
  exports: [...fromContainers.containers, ...fromDirectives.directives]
})
export class AuthModule {
}
