import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-notifications-bootstrap',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['notifications.component.scss'],
  template: `
    <section fxLayout="column" fxLayoutGap="10px" fxLayoutAlign="center center">
      <div>
        <router-outlet></router-outlet>
      </div>
    </section>
  `
})
export class NotificationsBootstrapComponent {}
