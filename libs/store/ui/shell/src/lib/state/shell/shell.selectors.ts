import * as fromReducer from './shell.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getState = createFeatureSelector<
  fromReducer.UiShellPartialState,
  fromReducer.State
>(fromReducer.UI_SHELL_FEATURE_KEY);

export const getNotificationShadeVisibility = createSelector(
  getState,
  (state: fromReducer.State) => state.notificationShadeVisibility,
);
