import * as Actions from './notifications.actions';
import { Action, on } from '@ngrx/store';
import { NOTIFICATION_GROUP_WITH_MESSAGES_MOCK } from '../../mocks';
import { NotificationGroup } from './notifications.models';
import { NotificationMessage } from './notifications.models';
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
      Actions.addNotificationMessage,
      (state, { appletName, body, title, timestamp, isFloating }) => {
        const existingGroup = state.notifications.find(
          (n) => n.appletName === appletName,
        );

        const newMessage: NotificationMessage = {
          body,
          timestamp: timestamp ?? Date.now(),
          title,
          id: uuidV4(),
          isFloating: isFloating ?? false,
        };

        if (existingGroup) {
          const groupCopy = JSON.parse(
            JSON.stringify(existingGroup),
          ) as NotificationGroup;

          groupCopy.messages.unshift(newMessage);

          const filteredGroups = state.notifications.filter(
            (g) => g.appletName !== appletName,
          );
          filteredGroups.unshift(groupCopy);

          return { ...state, notifications: filteredGroups };
        }

        const newGroup: NotificationGroup = {
          appletName,
          id: uuidV4(),
          messages: [newMessage],
        };

        return { ...state, notifications: [newGroup, ...state.notifications] };
      },
    ),
    on(
      Actions.hideNotificationMessage,
      (state, { notificationGroupId, notificationMessageId }) => {
        const existingGroup = state.notifications.find(
          (n) => n.id === notificationGroupId,
        );

        const notification = existingGroup?.messages.find(
          (m) => m.id === notificationMessageId,
        );

        if (!existingGroup || !notification) {
          return state;
        }

        const groupCopy = JSON.parse(
          JSON.stringify(existingGroup),
        ) as NotificationGroup;

        groupCopy.messages[
          groupCopy.messages.findIndex((m) => m.id === notificationMessageId)
        ].isFloating = false;

        const notificationsCopy = [...state.notifications];

        notificationsCopy[
          notificationsCopy.findIndex((g) => g.id === notificationGroupId)
        ] = groupCopy;

        return { ...state, notifications: notificationsCopy };
      },
    ),
    on(
      Actions.removeNotificationMessage,
      (state, { notificationGroupId, notificationMessageId }) => {
        const existingGroup = state.notifications.find(
          (n) => n.id === notificationGroupId,
        );

        if (
          !existingGroup ||
          !existingGroup.messages.some((m) => m.id === notificationMessageId)
        ) {
          return state;
        }

        const groupCopy = JSON.parse(
          JSON.stringify(existingGroup),
        ) as NotificationGroup;

        groupCopy.messages = groupCopy.messages.filter(
          (m) => m.id !== notificationMessageId,
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
    on(Actions.removeAllNotifications, (state) => {
      return {
        ...state,
        notifications: [],
      };
    }),
  );

export function reducer(state: State | undefined, action: Action) {
  return reducerSlice(state, action);
}
