import * as fromReducer from './notifications.reducer';
import { NotificationMessageWithGroup } from './notifications.models';
import { createEntitySelectors } from '@tomtomb/ngrx-toolkit';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getState = createFeatureSelector<
  fromReducer.NotificationsPartialState,
  fromReducer.State
>(fromReducer.NOTIFICATIONS_FEATURE_KEY);

export const entitySelectors = createEntitySelectors({
  getState,
  reducerAdapters: fromReducer.reducerAdapters,
});

export const getNotificationGroups = createSelector(
  getState,
  (state) => state.notificationGroups,
);

export const getFloatingNotificationMessages = createSelector(
  getNotificationGroups,
  (notificationGroups) => {
    const floatingNotificationMessages: NotificationMessageWithGroup[] = [];
    for (const group of notificationGroups) {
      floatingNotificationMessages.push(
        ...group.messages
          .filter((m) => m.isFloating)
          .map((m) => ({ ...m, group })),
      );

      if (floatingNotificationMessages.length === 3) {
        break;
      }
    }

    return floatingNotificationMessages.slice(0, 3);
  },
);
