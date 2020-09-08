import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingComponent} from './home-routing.component';
import {HomeComponent} from './home.component';
import {NavigationModule} from './navigation/navigation.module';



@NgModule({
  imports: [
    HomeRoutingComponent,
    NavigationModule,
    CommonModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
}
