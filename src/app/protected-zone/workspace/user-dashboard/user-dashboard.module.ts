import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {UserDashboardRoutingModule} from './user-dashboard-routing.module';

// components
import * as fromComponents from './components';


@NgModule({
  imports: [SharedModule,
    UserDashboardRoutingModule,
  ],
  declarations: [...fromComponents.components]
})
export class UserDashboardModule {
}
