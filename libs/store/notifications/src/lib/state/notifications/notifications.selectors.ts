import * as fromReducer from './notifications.reducer';
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
