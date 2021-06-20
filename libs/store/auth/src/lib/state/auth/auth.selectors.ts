import { createEntitySelectors } from '@tomtomb/ngrx-toolkit';
import { createFeatureSelector } from '@ngrx/store';

import {
  AUTH_FEATURE_KEY,
  AuthPartialState,
  State,
  storeSlice,
} from './auth.reducer';

export const getAuthState = createFeatureSelector<AuthPartialState, State>(
  AUTH_FEATURE_KEY,
);
export const entitySelectors = createEntitySelectors({
  getState: getAuthState,
  storeSlice,
});
