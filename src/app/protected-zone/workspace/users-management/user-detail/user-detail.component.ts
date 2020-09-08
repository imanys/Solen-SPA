import {Component, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-user-detail-bootstrap',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-user-detail-container></app-user-detail-container>
  `
})
export class UserDetailComponent {

}
