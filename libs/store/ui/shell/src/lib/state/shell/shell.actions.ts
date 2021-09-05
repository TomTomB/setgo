import {createAction, props} from '@ngrx/store';
import {UiTriggerAction} from '@setgo/types';

export const setNotificationShadeVisibility = createAction(
    '[UI->Shell] Set Notification Shade Visibility',
    props<{uiAction: UiTriggerAction}>(),
);
