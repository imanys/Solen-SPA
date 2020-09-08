import {Component} from '@angular/core';

import {EnvironmentService} from 'src/environments/environment.service';

@Component({
  selector: 'app-home',
  styleUrls: ['home.component.scss'],
  template: `
    <app-header [isSigningUpEnabled]="isSigningUpEnabled"></app-header>
    <header class="w3-container w3-red w3-center" style="padding:128px 16px">
      <h2 class="w3-margin w3-jumbo">Solen LMS</h2>
      <p class="w3-xlarge">an open source Learning Management System</p>
      <p class="w3-xlarge">intended for organizations</p>
      <a *ngIf="isSigningUpEnabled"
         class="w3-button w3-black w3-padding-large w3-large w3-margin-top"
         routerLink="/signing-up/organization/init">Get Started</a>
      <p class="w3-center github">
        <a href="https://github.solenlms.com" target="_blank"><img src="assets/images/GitHub-Mark-32px.png"> </a>
      </p>
    </header>
  `
})
export class HomeComponent {
  constructor(private env: EnvironmentService) {
  }

  get isSigningUpEnabled(): boolean {
    return this.env.isSigningUpEnabled;
  }
}
