import * as Actions from './auth.actions';
import {
  CallState,
  createActionId,
  createCallState,
  uniformActionType,
} from '@tomtomb/ngrx-toolkit';
import { reducer, storeSlice } from './auth.reducer';

describe('AuthReducer', () => {
  const initialState = storeSlice.initialState;

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'unknown',
      };
      const state = reducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('fetchSignInMethodsForEmail.call action', () => {
    it('should update the state in an immutable way', () => {
      const action = Actions.fetchSignInMethodsForEmail.call({
        args: { body: { email: 'test@example.com' } },
      });

      const actionId = createActionId(action);
      const actionKey = uniformActionType(action.type);
      const state = reducer(initialState, action);
      const callState = createCallState(action, CallState.LOADING);

      state[actionKey].entities[actionId].timestamp = callState.timestamp;

      expect(state).toEqual({
        ...initialState,
        [actionKey]: { ids: [actionId], entities: { [actionId]: callState } },
      });
    });
  });

  describe('fetchSignInMethodsForEmail.success action', () => {
    it('should update the state in an immutable way', () => {
      const action = Actions.fetchSignInMethodsForEmail.success({
        args: { body: { email: 'test@example.com' } },
        response: ['test'],
      });

      const actionId = createActionId(action);
      const actionKey = uniformActionType(action.type);
      const state = reducer(initialState, action);
      const callState = createCallState(action, CallState.SUCCESS);

      state[actionKey].entities[actionId].timestamp = callState.timestamp;

      expect(state).toEqual({
        ...initialState,
        [actionKey]: { ids: [actionId], entities: { [actionId]: callState } },
      });
    });
  });

  describe('fetchSignInMethodsForEmail.failure action', () => {
    it('should update the state in an immutable way', () => {
      const action = Actions.fetchSignInMethodsForEmail.failure({
        args: { body: { email: 'test@example.com' } },
        error: {
          data: null,
          message: 'test error',
          status: 'error',
        },
      });

      const actionId = createActionId(action);
      const actionKey = uniformActionType(action.type);
      const state = reducer(initialState, action);
      const callState = createCallState(action, CallState.ERROR);

      state[actionKey].entities[actionId].timestamp = callState.timestamp;

      expect(state).toEqual({
        ...initialState,
        [actionKey]: { ids: [actionId], entities: { [actionId]: callState } },
      });
    });
  });
});
