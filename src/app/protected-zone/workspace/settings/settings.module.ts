import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {SettingsRoutingModule} from './settings-routing.module';

// module bootstrap
import {SettingsComponent} from './settings.component';


@NgModule({
  imports: [
    SharedModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent,
  ]
})
export class SettingsModule {
}
