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

export const addNotification = createAction(
  '[Notifications] Add Notification',
  props<Models.AddNotificationArgs>(),
);

export const removeNotification = createAction(
  '[Notifications] Remove Notification',
  props<Models.RemoveNotificationArgs>(),
);

export const removeNotificationGroup = createAction(
  '[Notifications] Remove Notification Group',
  props<Models.RemoveNotificationGroupArgs>(),
);

export const NOTIFICATIONS_ACTIONS = { getFoo };
