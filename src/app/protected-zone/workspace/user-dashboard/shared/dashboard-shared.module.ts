import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {SharedModule} from 'src/app/shared/shared.module';

// store
import {reducers, effects} from './store';

// services
import * as fromServices from './services';

// guards
import * as fromGuards from './guards';


// components
import * as fromComponents from './components';
import {CoursesInfoComponent, StorageUserInfoComponent} from './components';



@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('dashboard', reducers),
    EffectsModule.forFeature(effects),
    RouterModule
  ],
  declarations: [
    ...fromComponents.components
  ],
  exports: [
    StorageUserInfoComponent,
    CoursesInfoComponent
  ],
  providers: [...fromServices.services, ...fromGuards.guards]
})
export class DashboardSharedModule {
}
