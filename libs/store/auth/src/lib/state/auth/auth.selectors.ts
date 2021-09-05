import {createFeatureSelector} from '@ngrx/store';
import {createEntitySelectors} from '@tomtomb/ngrx-toolkit';

import * as fromReducer from './auth.reducer';

const getState = createFeatureSelector<fromReducer.AuthPartialState, fromReducer.State>(
    fromReducer.AUTH_FEATURE_KEY);

export const entitySelectors = createEntitySelectors({
  getState,
  reducerAdapters: fromReducer.reducerAdapters,
});
