import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

import {BlockUserCommand, UnblockUserCommand, UserDto} from 'src/app/models';


@Component({
  selector: 'app-user-activation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['user-activation.component.scss'],
  template: `
    <div fxLayout fxFlexAlign="center center">
      <button
        fxFlex
        mat-button
        color="warn"
        (click)="onClick()">
        <span>{{ text }}</span>
      </button>
    </div>

  `
})
export class UserActivationComponent {
  @Input() user: UserDto;

  @Output() userBlocked = new EventEmitter<BlockUserCommand>();
  @Output() userUnblocked = new EventEmitter<UnblockUserCommand>();


  onClick() {
    const userId = this.user.id;
    if (this.user.isBlocked) {
      this.userUnblocked.emit({userId});
    } else {
      this.userBlocked.emit({userId});
    }
  }

  get text() {
    return this.user.isBlocked ? 'Unblock this user' : 'Block this user';
  }
}

