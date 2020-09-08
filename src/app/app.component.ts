import {Component} from '@angular/core';

import {Store} from '@ngrx/store';

import {TranslateService} from '@ngx-translate/core';

import * as fromAuth from './auth/store';


@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {


  constructor(
    private store: Store<fromAuth.AuthState>,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
  }
}
