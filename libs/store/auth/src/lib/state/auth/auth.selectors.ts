import {
  AUTH_FEATURE_KEY,
  AuthPartialState,
  State,
  reducerAdapters,
} from './auth.reducer';
import { createEntitySelectors } from '@tomtomb/ngrx-toolkit';
import { createFeatureSelector } from '@ngrx/store';

const getState = createFeatureSelector<AuthPartialState, State>(
  AUTH_FEATURE_KEY,
);

export const entitySelectors = createEntitySelectors({
  getState,
  reducerAdapters,
});
