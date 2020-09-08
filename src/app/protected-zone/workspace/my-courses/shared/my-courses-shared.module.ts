import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from 'src/app/shared/shared.module';

// store
import { reducers, effects } from './store';

// services
import * as fromServices from './services';

// guards
import * as fromGuards from './guards';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('my-courses', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  exports: [],
  providers: [...fromServices.services, ...fromGuards.guards]
})
export class MyCoursesSharedModule {}
