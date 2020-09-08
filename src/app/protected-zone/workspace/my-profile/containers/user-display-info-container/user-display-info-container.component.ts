import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromStore from '../../store';

import {UpdateCurrentUserInfoCommand, UserForProfileDto} from 'src/app/models';


@Component({
  selector: 'app-user-display-info-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-user-display-info [userInfo]="userInfo$ | async" (updated)="onUpdate($event)">

    </app-user-display-info>
  `
})
export class UserDisplayInfoContainerComponent implements OnInit {
  userInfo$: Observable<UserForProfileDto>;

  constructor(private store: Store<fromStore.MyProfileState>) {
  }

  ngOnInit() {
    this.userInfo$ = this.store.select(fromStore.getCurrentUserInfo);
  }

  onUpdate(event: UpdateCurrentUserInfoCommand) {
    this.store.dispatch(fromStore.updateCurrentUserInfo(event));
  }
}

