import * as fromReducer from './auth.reducer';
import { createEntitySelectors } from '@tomtomb/ngrx-toolkit';
import { createFeatureSelector } from '@ngrx/store';

const getState = createFeatureSelector<
  fromReducer.AuthPartialState,
  fromReducer.State
>(fromReducer.AUTH_FEATURE_KEY);

export const entitySelectors = createEntitySelectors({
  getState,
  reducerAdapters: fromReducer.reducerAdapters,
});
