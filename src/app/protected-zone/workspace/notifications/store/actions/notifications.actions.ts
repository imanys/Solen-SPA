import {createAction} from '@ngrx/store';

import {NotificationDto} from 'src/app/models';


export const loadNotifications = createAction('[Notifications] Load Notifications');

export const loadNotificationsSuccess = createAction(
  '[Notifications] Load Notifications Success',
  (notifications: NotificationDto[]) => ({
    notifications
  })
);

export const loadNotificationsFail = createAction(
  '[Notifications] Load Notifications Fail',
  (error: any) => ({
    error
  })
);

export const markNotificationAsRead = createAction(
  '[Notifications] Mark Notification As Read',
  (notificationId: string) => ({
    notificationId
  })
);
