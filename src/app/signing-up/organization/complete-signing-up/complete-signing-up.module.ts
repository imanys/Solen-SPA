import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import {CompleteSigningUpRoutingModule} from './complete-signing-up-routing.module';
import {CompleteSigningUpComponent} from './complete-signing-up.component';

// services
import * as fromServices from './services';

// guards
import * as fromGuards from './guards';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatSnackBarModule,
    CompleteSigningUpRoutingModule,
  ],
  declarations: [CompleteSigningUpComponent,
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
})
export class CompleteSigningUpModule {
}
