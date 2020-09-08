import {Component, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-settings',
  styleUrls: ['settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section fxLayout="column" fxLayoutGap="10px" fxLayoutAlign="center center">
      <nav mat-tab-nav-bar>
        <a
          mat-tab-link
          *ngFor="let link of navLinks"
          [routerLink]="link.path"
          routerLinkActive
          #rla="routerLinkActive"
          [active]="rla.isActive"
        >
          {{ link.label }}
        </a>
      </nav>

      <div>
        <router-outlet></router-outlet>
      </div>
    </section>
  `
})
export class SettingsComponent {
  navLinks: any[];

  constructor() {
    this.navLinks = [
      {
        label: 'Organization',
        path: 'organization'
      },
      {
        label: 'Notifications',
        path: 'notifications'
      }
    ];
  }

}
