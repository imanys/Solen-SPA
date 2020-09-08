import {NotificationDto} from '../../../../../models';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromNotifications from '../actions/notifications.actions';

export interface State {
  entities: { [id: string]: NotificationDto };
  error: any;
}

export const initialState: State = {
  entities: {},
  error: null
};

const featureReducer = createReducer(
  initialState,
  on(fromNotifications.loadNotificationsSuccess, (state, { notifications }) => {
    const entities = notifications.reduce(
      (
        notificationEntities: { [id: string]: NotificationDto },
        notification: NotificationDto
      ) => {
        return {
          ...notificationEntities,
          [notification.id]: notification
        };
      },
      {}
    );

    return {
      ...state,
      entities,
    };
  }),
  on(fromNotifications.loadNotificationsFail, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return featureReducer(state, action);
}

export const getNotificationsEntities = (state: State) => state.entities;
export const getNotificationsError = (state: State) => state.error;
