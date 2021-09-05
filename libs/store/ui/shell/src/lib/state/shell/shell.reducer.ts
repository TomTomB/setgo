import * as Actions from './shell.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { UiTriggerAction } from '@setgo/types';

export const UI_SHELL_FEATURE_KEY = 'uiShell';

export interface State {
  notificationShadeVisibility: UiTriggerAction;
}

export interface UiShellPartialState {
  readonly [UI_SHELL_FEATURE_KEY]: State;
}

export const initialState: State = {
  notificationShadeVisibility: 'close',
};

const uiShellReducer = createReducer(
  initialState,
  on(Actions.setNotificationShadeVisibility, (state, { uiAction }) => ({
    ...state,
    notificationShadeVisibility:
      uiAction === 'toggle'
        ? state.notificationShadeVisibility === 'open'
          ? 'close'
          : 'open'
        : uiAction,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return uiShellReducer(state, action);
}
