import {NotificationMessage} from './notification.types';

export interface NotificationGroup {
  appletName: string;
  id: string;
  messages: NotificationMessage[];
}
