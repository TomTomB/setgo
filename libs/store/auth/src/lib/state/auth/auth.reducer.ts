import * as Actions from './auth.actions';
import { Action, createReducer } from '@ngrx/store';
import { EntityActionState, createStoreSlice } from '@tomtomb/ngrx-toolkit';

export const AUTH_FEATURE_KEY = 'auth';

export type State = EntityActionState;

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const storeSlice = createStoreSlice(Actions.AUTH_ACTIONS);

const authReducer = createReducer(storeSlice.initialState, ...storeSlice.ons);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
