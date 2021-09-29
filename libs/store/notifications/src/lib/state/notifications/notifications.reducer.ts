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
  notificationGroups: NotificationGroup[];
}

const initialStateExtra: StateExtra = {
  notificationGroups: [...NOTIFICATION_GROUP_WITH_MESSAGES_MOCK],
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
        const existingGroup = state.notificationGroups.find(
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

          const filteredGroups = state.notificationGroups.filter(
            (g) => g.appletName !== appletName,
          );
          filteredGroups.unshift(groupCopy);

          return { ...state, notificationGroups: filteredGroups };
        }

        const newGroup: NotificationGroup = {
          appletName,
          id: uuidV4(),
          messages: [newMessage],
        };

        return {
          ...state,
          notificationGroups: [newGroup, ...state.notificationGroups],
        };
      },
    ),
    on(
      Actions.hideNotificationMessage,
      (state, { notificationGroupId, notificationMessageId }) => {
        const existingGroup = state.notificationGroups.find(
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

        const notificationsCopy = [...state.notificationGroups];

        notificationsCopy[
          notificationsCopy.findIndex((g) => g.id === notificationGroupId)
        ] = groupCopy;

        return { ...state, notificationGroups: notificationsCopy };
      },
    ),
    on(Actions.hideAllNotificationMessages, (state) => {
      const updatedNotifications = state.notificationGroups.map((group) => ({
        ...group,
        messages: group.messages.map((message) => ({
          ...message,
          isFloating: false,
        })),
      }));

      return { ...state, notificationGroups: updatedNotifications };
    }),
    on(
      Actions.removeNotificationMessage,
      (state, { notificationGroupId, notificationMessageId }) => {
        const existingGroup = state.notificationGroups.find(
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
            notificationGroups: state.notificationGroups.filter(
              (g) => g.id !== notificationGroupId,
            ),
          };
        }

        const notificationsCopy = [...state.notificationGroups];

        notificationsCopy[
          notificationsCopy.findIndex((g) => g.id === notificationGroupId)
        ] = groupCopy;

        return { ...state, notificationGroups: notificationsCopy };
      },
    ),
    on(Actions.removeNotificationGroup, (state, { notificationGroupId }) => {
      return {
        ...state,
        notificationGroups: state.notificationGroups.filter(
          (g) => g.id !== notificationGroupId,
        ),
      };
    }),
    on(Actions.removeAllNotifications, (state) => {
      return {
        ...state,
        notificationGroups: [],
      };
    }),
  );

export function reducer(state: State | undefined, action: Action) {
  return reducerSlice(state, action);
}
