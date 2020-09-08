import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromNotifications from './notifications.reducer';


export interface NotificationsState {
  notifications: fromNotifications.State;
}

export const reducers: ActionReducerMap<NotificationsState> = {
  notifications: fromNotifications.reducer
};

export const getNotificationsFeatureState = createFeatureSelector<NotificationsState>('notifications');
