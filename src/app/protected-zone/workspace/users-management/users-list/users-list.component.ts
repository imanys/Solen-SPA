import {Component, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-users-list-bootstrap',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div fxLayout="row" fxLayoutAlign="center">
      <app-invite-members-container></app-invite-members-container>
    </div>
    <app-users-list-container></app-users-list-container>
  `
})
export class UsersListComponent {

}
