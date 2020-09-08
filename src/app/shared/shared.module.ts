import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import {DragDropModule} from '@angular/cdk/drag-drop';

import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {MaterialModule} from 'src/app/angular-material/angular-material.module';

import {AngularEditorModule} from '@kolkov/angular-editor';

import {NgxPaginationModule} from 'ngx-pagination';

import {reducers, effects} from './store';

// services
import * as fromServices from './services';
// components
import * as fromComponents from './components';
// pipes
import * as fromPipes from './pipes';

const sharedModules: any[] = [
  CommonModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  DragDropModule,
  MaterialModule,
  AngularEditorModule,
  TranslateModule,
  NgxPaginationModule
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    TranslateModule,
    MaterialModule,
    AngularEditorModule,
    StoreModule.forFeature('shared', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [...fromComponents.components, ...fromPipes.pipes],
  exports: [...sharedModules, fromComponents.components, ...fromPipes.pipes],
  entryComponents: [...fromComponents.entryComponents],
  providers: [...fromServices.services, ...fromPipes.pipes]
})
export class SharedModule {
}
