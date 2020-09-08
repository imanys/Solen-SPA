import {NgModule} from '@angular/core';

import {SharedModule} from 'src/app/shared/shared.module';
import {LearningPathsRoutingModule} from './learning-paths-routing.module';
import {LearningPathsSharedModule} from './shared/learning-paths-shared.module';

// module bootstrap
import {LearningPathsComponent} from './learning-paths.component';


@NgModule({
  imports: [
    SharedModule,
    LearningPathsRoutingModule,
    LearningPathsSharedModule
  ],
  declarations: [
    LearningPathsComponent,
  ]
})
export class LearningPathsModule {
}
