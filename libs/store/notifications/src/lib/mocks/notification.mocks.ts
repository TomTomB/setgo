import { NotificationMessage } from '../state';

export const NOTIFICATION_MOCK: NotificationMessage = {
  id: '1',
  body: 'Test',
  timestamp: Date.now(),
  title: 'Test',
  isFloating: true,
};
