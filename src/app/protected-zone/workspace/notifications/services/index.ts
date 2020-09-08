import {WebSocketService} from './web-socket.service';
import {NotificationsService} from './notifications.service';

export const services: any[] = [WebSocketService, NotificationsService];

export * from './web-socket.service';
export * from './notifications.service';
