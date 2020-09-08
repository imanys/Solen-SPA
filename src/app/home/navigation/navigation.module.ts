import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';

import * as fromComponents from './components';


@NgModule({
  imports: [RouterModule, MatToolbarModule, FlexLayoutModule, CommonModule],
  declarations: [fromComponents.components],
  exports: [fromComponents.components]
})
export class NavigationModule {}
