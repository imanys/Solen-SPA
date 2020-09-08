import {Component} from '@angular/core';

@Component({
  selector: 'app-auth',
  styleUrls: ['auth.component.scss'],
  template: `
    <app-auth-header></app-auth-header>
    <div>
      <router-outlet></router-outlet>
    </div>

  `
})
export class AuthComponent {

}
