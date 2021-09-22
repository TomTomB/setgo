import * as Actions from './notifications.actions';
import { Action, on } from '@ngrx/store';
import { NOTIFICATION_GROUP_WITH_MESSAGES_MOCK } from '../../mocks';
import { NotificationGroup } from './notifications.models';
import { createReducerSlice } from '@tomtomb/ngrx-toolkit';
import { v4 as uuidV4 } from 'uuid';

export const NOTIFICATIONS_FEATURE_KEY = 'notifications';

export type State = typeof initialState;

export interface StateExtra {
  notifications: NotificationGroup[];
}

const initialStateExtra: StateExtra = {
  notifications: [...NOTIFICATION_GROUP_WITH_MESSAGES_MOCK],
};

export interface NotificationsPartialState {
  readonly [NOTIFICATIONS_FEATURE_KEY]: State;
}

export const { reducerSlice, reducerAdapters, initialState } =
  createReducerSlice(
    {
      actions: Actions.NOTIFICATIONS_ACTIONS,
      key: NOTIFICATIONS_FEATURE_KEY,
      initialStateExtra,
    },
    on(
      Actions.addNotification,
      (state, { appletName, body, title, timestamp }) => {
        const existingGroup = state.notifications.find(
          (n) => n.appletName === appletName,
        );

        if (existingGroup) {
          const groupCopy = JSON.parse(
            JSON.stringify(existingGroup),
          ) as NotificationGroup;

          groupCopy.messages.push({
            body,
            timestamp: timestamp ?? Date.now(),
            title,
            id: uuidV4(),
          });

          const filteredGroups = state.notifications.filter(
            (g) => g.appletName !== appletName,
          );
          filteredGroups.unshift(groupCopy);

          return { ...state, notifications: filteredGroups };
        }

        const newGroup: NotificationGroup = {
          appletName,
          id: uuidV4(),
          messages: [
            {
              body,
              id: uuidV4(),
              timestamp: timestamp ?? Date.now(),
              title,
            },
          ],
        };

        return { ...state, notifications: [newGroup, ...state.notifications] };
      },
    ),
    on(
      Actions.removeNotification,
      (state, { notificationGroupId, notificationId }) => {
        const existingGroup = state.notifications.find(
          (n) => n.id === notificationGroupId,
        );

        if (
          !existingGroup ||
          !existingGroup.messages.some((m) => m.id === notificationId)
        ) {
          return state;
        }

        const groupCopy = JSON.parse(
          JSON.stringify(existingGroup),
        ) as NotificationGroup;

        groupCopy.messages = groupCopy.messages.filter(
          (m) => m.id !== notificationId,
        );

        if (!groupCopy.messages.length) {
          return {
            ...state,
            notifications: state.notifications.filter(
              (g) => g.id !== notificationGroupId,
            ),
          };
        }

        const notificationsCopy = [...state.notifications];

        notificationsCopy[
          notificationsCopy.findIndex((g) => g.id === notificationGroupId)
        ] = groupCopy;

        return { ...state, notifications: notificationsCopy };
      },
    ),
    on(Actions.removeNotificationGroup, (state, { notificationGroupId }) => {
      return {
        ...state,
        notifications: state.notifications.filter(
          (g) => g.id !== notificationGroupId,
        ),
      };
    }),
  );

export function reducer(state: State | undefined, action: Action) {
  return reducerSlice(state, action);
}
