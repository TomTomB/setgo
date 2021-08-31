import { UiTriggerAction } from '@setgo/types';
import { createAction, props } from '@ngrx/store';

export const setNotificationShadeVisibility = createAction(
  '[UI->Shell] Set Notification Shade Visibility',
  props<{ uiAction: UiTriggerAction }>(),
);
