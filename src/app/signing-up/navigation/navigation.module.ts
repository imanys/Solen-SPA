import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

import * as fromComponents from './components';

@NgModule({
  imports: [RouterModule, MatToolbarModule],
  declarations: [fromComponents.components],
  exports: [fromComponents.components]
})
export class NavigationModule {}
