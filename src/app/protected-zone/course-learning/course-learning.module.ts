import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {CourseLearningRoutingModule} from './course-learning-routing.module';
import {NavigationModule} from './navigation/navigation.module';

import {CourseLearningComponent} from './course-learning.component';


@NgModule({
  imports: [
    SharedModule,
    CourseLearningRoutingModule,
    NavigationModule
  ],
  declarations: [CourseLearningComponent]
})
export class CourseLearningModule {}
