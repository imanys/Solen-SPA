import {ChangeDetectionStrategy, Component} from '@angular/core';


@Component({
  selector: 'app-admin-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['admin-dashboard.component.scss'],
  template: `
    <section fxLayout="column" fxLayoutGap="10px" fxLayoutAlign="center center">
      <div>
        <app-dashboard-container></app-dashboard-container>
      </div>

    </section>

  `
})
export class AdminDashboardComponent {

}
