import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromStore from '../../store';
import * as fromRouter from 'src/app/app-routing/store';

import {UsersListItemDto} from 'src/app/models';


@Component({
  selector: 'app-users-list-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-users-list [users]="users$ | async"
                    (userSelected)="onUserSelected($event)">
    </app-users-list>
  `
})
export class UsersListContainerComponent implements OnInit {
  users$: Observable<UsersListItemDto[]>;

  constructor(private store: Store<fromStore.UsersState>) {
  }

  ngOnInit() {
    this.users$ = this.store.select(fromStore.getUsers);
  }

  onUserSelected(userId: string) {
    const path = `/workspace/users/${userId}`;

    this.store.dispatch(fromRouter.go({path: [path]}));
  }
}

