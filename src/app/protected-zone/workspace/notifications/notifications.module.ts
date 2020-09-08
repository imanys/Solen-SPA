import {NgModule} from '@angular/core';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {NotificationsRoutingModule} from './notifications-routing.module';
import {SharedModule} from 'src/app/shared/shared.module';

// store
import {effects, reducers} from './store';

// services
import * as fromServices from './services';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

// module bootstrap
import {NotificationsBootstrapComponent} from './notifications.component';


@NgModule({
  providers: [...fromServices.services],
  imports: [
    NotificationsRoutingModule,
    StoreModule.forFeature('notifications', reducers),
    EffectsModule.forFeature(effects),
    SharedModule],
  declarations: [
    NotificationsBootstrapComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class NotificationsModule {
}
