import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {Store} from '@ngrx/store';
import * as fromStore from '../../store';

import {NotificationDto} from 'src/app/models/models';
import {Observable} from 'rxjs';
import * as fromRouter from 'src/app/app-routing/store';

@Component({
  selector: 'app-notification-detail-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-go-back-button (clicked)="onGoBackClick()"></app-go-back-button>

    <app-notification-detail [notification]="notification$ | async">
    </app-notification-detail>
  `
})
export class NotificationDetailContainerComponent implements OnInit {
  notification$: Observable<NotificationDto>;

  constructor(private store: Store<fromStore.NotificationsState>) {
  }

  ngOnInit() {
    this.notification$ = this.store.select(fromStore.getSelectedNotification);
  }

  onGoBackClick() {
    this.store.dispatch(
      fromRouter.go({path: ['/workspace/notifications']})
    );
  }
}

