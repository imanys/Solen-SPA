import {NgModule} from '@angular/core';

import {NavigationModule} from './navigation/navigation.module';
import {SigningUpRoutingModule} from './signing-up-routing.module';
import {SigningUpComponent} from './signing-up.component';


@NgModule({
  imports: [
    SigningUpRoutingModule,
    NavigationModule
  ],
  declarations: [SigningUpComponent]

})
export class SigningUpModule {
}
