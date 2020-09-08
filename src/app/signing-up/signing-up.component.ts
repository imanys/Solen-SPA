import {Component} from '@angular/core';

@Component({
  selector: 'app-signing-up-root',
  styleUrls: ['signing-up.component.scss'],
  template: `
    <app-signing-up-header></app-signing-up-header>
    <div>
      <router-outlet></router-outlet>
    </div>

  `
})
export class SigningUpComponent {

}
