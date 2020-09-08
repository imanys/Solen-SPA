import {Component} from '@angular/core';

@Component({
  selector: 'app-signing-up-header',
  styleUrls: ['header.component.scss'],
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row class="mat-toolbar-row-top">
        <div>
          <a routerLink="/"><img src="assets/images/solen-logo-transparent.png" width="70" height="70"> </a>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
  `
})
export class HeaderComponent {

}
