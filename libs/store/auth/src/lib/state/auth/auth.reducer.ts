import * as Actions from './auth.actions';
import { Action } from '@ngrx/store';
import { createReducerSlice } from '@tomtomb/ngrx-toolkit';

export const AUTH_FEATURE_KEY = 'auth';

export type State = typeof initialState;

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const { reducerAdapters, reducerSlice, initialState } =
  createReducerSlice({
    actions: Actions.AUTH_ACTIONS,
    key: AUTH_FEATURE_KEY,
    initialStateExtra: {},
  });

export function reducer(state: State | undefined, action: Action) {
  return reducerSlice(state, action);
}
