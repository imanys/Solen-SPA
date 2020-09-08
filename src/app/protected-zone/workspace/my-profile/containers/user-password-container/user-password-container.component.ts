import {Component, ChangeDetectionStrategy} from '@angular/core';

import {Store} from '@ngrx/store';

import * as fromStore from '../../store';

import {UpdateCurrentUserPasswordCommand} from 'src/app/models';


@Component({
  selector: 'app-user-password-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-user-password (updated)="onUpdate($event)">

    </app-user-password>
  `
})
export class UserPasswordContainerComponent {

  constructor(private store: Store<fromStore.MyProfileState>) {
  }

  onUpdate(event: UpdateCurrentUserPasswordCommand) {
    this.store.dispatch(fromStore.updateCurrentUserPassword(event));
  }
}

