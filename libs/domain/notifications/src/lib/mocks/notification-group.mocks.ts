import { NotificationGroup } from '../types';

export const NOTIFICATION_GROUP_MOCK: NotificationGroup = {
  appletName: 'Test',
  id: '1',
  messages: [],
};

export const NOTIFICATION_GROUP_WITH_MESSAGES_MOCK: NotificationGroup[] = [];

for (let i = 0; i < 10; i++) {
  NOTIFICATION_GROUP_WITH_MESSAGES_MOCK.push({
    appletName: `Updater (${i})`,
    id: i.toString(),
    messages: [
      {
        timestamp: Date.now(),
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        title: 'Ein Update steht zur Verfügung',
        id: `${i}_0`,
      },
      {
        timestamp: Date.now(),
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        title: 'Update installiert',
        id: `${i}_1`,
      },
    ],
  });
}
