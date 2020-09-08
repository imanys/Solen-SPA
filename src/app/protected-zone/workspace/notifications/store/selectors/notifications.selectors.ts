import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromNotifications from '../reducers/notifications.reducer';
import * as fromRouter from 'src/app/app-routing/store/reducers';

import { NotificationDto} from '../../../../../models';

const getNotificationsState = createSelector(
  fromFeature.getNotificationsFeatureState,
  (state: fromFeature.NotificationsState) => state.notifications
);

export const getNotificationsEntities = createSelector(
  getNotificationsState,
  fromNotifications.getNotificationsEntities
);

export const getSelectedNotification = createSelector(
  getNotificationsEntities,
  fromRouter.getRouterState,
  (entities, router): NotificationDto => {
    return router && router.state && entities[router.state.params.notificationId];
  }
);


function sortByDate(n1: NotificationDto, n2: NotificationDto) {
  return  new Date(n2.creationDate).getTime() - new Date(n1.creationDate).getTime();
}

export const getAllNotifications = createSelector(
  getNotificationsEntities,
  entities => {
    return entities && Object.keys(entities).map(id => entities[id]).sort(sortByDate);
  }
);


export const getUnreadNotificationCount = createSelector(
  getAllNotifications,
  notifications => {
    return notifications.filter(x => !x.isRead).length;
  }
);
