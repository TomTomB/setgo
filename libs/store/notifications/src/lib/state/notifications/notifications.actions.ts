import * as Models from './notifications.models';
import { createAction, props } from '@ngrx/store';
import { createHttpActionGroup, defineArgTypes } from '@tomtomb/ngrx-toolkit';

export const NOTIFICATIONS_ACTION_PREFIX = 'Notifications';

export const getFoo = createHttpActionGroup({
  method: 'GET',
  name: 'Foo',
  scope: NOTIFICATIONS_ACTION_PREFIX,
  argsTypes: defineArgTypes<{
    args: Models.GetFooArgs;
    response: null;
    errorResponse: null;
  }>(),
});

export const addNotificationMessage = createAction(
  '[Notifications] Add Notification Message',
  props<Models.AddNotificationMessageArgs>(),
);

export const hideNotificationMessage = createAction(
  '[Notifications] Hide Notification Message',
  props<Models.HideNotificationMessageArgs>(),
);

export const hideAllNotificationMessages = createAction(
  '[Notifications] Hide All Notification Messages',
);

export const removeNotificationMessage = createAction(
  '[Notifications] Remove Notification Message',
  props<Models.RemoveNotificationMessageArgs>(),
);

export const removeNotificationGroup = createAction(
  '[Notifications] Remove Notification Group',
  props<Models.RemoveNotificationGroupArgs>(),
);

export const removeAllNotifications = createAction(
  '[Notifications] Remove All Notifications',
);

export const NOTIFICATIONS_ACTIONS = { getFoo };
