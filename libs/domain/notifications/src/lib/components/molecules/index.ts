import { FloatNotificationComponent } from './float-notification/float-notification.component';
import { NotificationGroupComponent } from './notification-group/notification-group.component';

export * from './notification-group/notification-group.component';
export * from './float-notification/float-notification.component';

export const COMPONENTS = [
  NotificationGroupComponent,
  FloatNotificationComponent,
] as const;
