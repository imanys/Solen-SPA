import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

import * as fromComponents from './components';

@NgModule({
  imports: [RouterModule, SharedModule,
    NgCircleProgressModule.forRoot({
      backgroundGradient: true,
      backgroundOpacity: 0,
      backgroundPadding: 0,
      radius: 25,
      maxPercent: 100,
      unitsColor: '#ffffff',
      outerStrokeWidth: 5,
      outerStrokeColor: '#ff57a7',
      innerStrokeWidth: 0,
      titleColor: '#ffffff',
      titleFontSize: '13',
      showInnerStroke: false,
      startFromZero: false,
      showSubtitle: false
    })],
  declarations: [fromComponents.components],
  exports: [fromComponents.components]
})
export class NavigationModule {}
