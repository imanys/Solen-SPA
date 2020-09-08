import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {LearningPathDetailRoutingModule} from './learning-path-detail-routing.module';


import {LearningPathDetailComponent} from './learning-path-detail.component';


@NgModule({
  imports: [
    SharedModule,
    LearningPathDetailRoutingModule,
  ],
  declarations: [
    LearningPathDetailComponent
  ],
})
export class LearningPathDetailModule {
}
