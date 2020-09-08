import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';


import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromRouter from 'src/app/app-routing/store';

import {NotificationDto} from 'src/app/models/models';

@Component({
  selector: 'app-notifications-list-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-notifications-list [notifications]="notifications$ | async"
                            (notificationSelected)="selectNotification($event)">

    </app-notifications-list>
  `
})
export class NotificationsListContainerComponent implements OnInit {
  notifications$: Observable<NotificationDto[]>;

  constructor(private store: Store<fromStore.NotificationsState>) {
  }

  ngOnInit() {
    this.notifications$ = this.store.select(fromStore.getAllNotifications);
  }

  selectNotification(notification: NotificationDto) {
    if (!notification.isRead) {
      this.store.dispatch(fromStore.markNotificationAsRead(notification.id));
    }
    this.store.dispatch(fromRouter.go({path: ['/workspace/notifications', notification.id]}));
  }
}

