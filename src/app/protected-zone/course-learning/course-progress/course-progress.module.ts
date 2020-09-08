import {NgModule} from '@angular/core';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {CourseProgressRoutingModule} from './course-progress-routing.module';
import {SharedModule} from 'src/app/shared/shared.module';

// store
import {reducers, effects} from './store';

// guards
import * as fromGuards from './guards';

// services
import * as fromServices from './services';

// module bootstrap
import {CourseProgressComponent} from './course-progress.component';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';



@NgModule({
  imports: [SharedModule,
    StoreModule.forFeature('course-learning', reducers),
    EffectsModule.forFeature(effects),
    CourseProgressRoutingModule
  ],
  declarations: [
    CourseProgressComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  providers: [...fromServices.services, ...fromGuards.guards]
})
export class CourseProgressModule {
}
