import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthModule } from 'src/app/auth/auth.module';
import { SharedModule } from '../../../shared/shared.module';

import * as fromComponents from './components';

@NgModule({
  imports: [RouterModule, SharedModule, AuthModule],
  declarations: [fromComponents.components],
  exports: [fromComponents.components]
})
export class NavigationModule {}
