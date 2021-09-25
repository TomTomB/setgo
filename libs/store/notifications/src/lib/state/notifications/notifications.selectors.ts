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

export const getNotifications = createSelector(
  getState,
  (state) => state.notifications,
);

export const getFloatingNotificationMessages = createSelector(
  getNotifications,
  (notifications) => {
    const floatingNotificationMessages: NotificationMessageWithGroup[] = [];
    for (const group of notifications) {
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
