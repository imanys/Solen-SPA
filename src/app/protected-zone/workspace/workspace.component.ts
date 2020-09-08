import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAuth from '../../auth/store';
import * as fromUi from '../../shared/store';
import * as fromNotifications from './notifications/store';
import { LoggedUserDto } from 'src/app/models';

@Component({
  selector: 'app-workspace-root',
  styleUrls: ['workspace.component.scss'],
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav role="navigation">
        <app-sidenav-list (sidenavClosed)="sidenav.close()"></app-sidenav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <app-workspace-header
          (sidenavToggle)="sidenav.toggle()"
          (logOut)="logOut()"
          [loggedUser]="loggedUser$ | async"
          [notificationsCount]="notificationsCount$ | async"
        ></app-workspace-header>
        <app-progress-spinner [displayProgressSpinner]="isLoading$ | async">
        </app-progress-spinner>
          <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class WorkspaceComponent implements OnInit {
  loggedUser$: Observable<LoggedUserDto>;
  isLoading$: Observable<boolean>;
  notificationsCount$: Observable<number>;

  constructor(
    private store: Store<fromAuth.AuthState>,
  ) {
  }

  ngOnInit() {
    this.loggedUser$ = this.store.select(fromAuth.getLoggedUser);
    this.isLoading$ = this.store.select(fromUi.isLoadingSpinnerActive);
    this.notificationsCount$ = this.store.select(fromNotifications.getUnreadNotificationCount);
  }

  logOut() {
    this.store.dispatch(fromAuth.logOut());
  }
}
