import {WebSocketEffects} from './web-socket.effects';
import {CourseNotificationsEffects} from './course-notifications.effects';
import {NotificationsEffects} from './notifications.effects';

export const effects: any[] = [WebSocketEffects, CourseNotificationsEffects, NotificationsEffects];

export * from './web-socket.effects';
export * from './course-notifications.effects';
export * from './notifications.effects';
