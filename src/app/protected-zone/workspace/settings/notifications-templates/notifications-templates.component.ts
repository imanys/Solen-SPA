import {Component, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-notifications',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <router-outlet></router-outlet>
    </section>
  `
})
export class NotificationsTemplatesComponent {

}
