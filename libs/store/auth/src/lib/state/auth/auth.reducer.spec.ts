import {CallState, createTestingState} from '@tomtomb/ngrx-toolkit';

import * as Actions from './auth.actions';
import {initialState, reducer} from './auth.reducer';

describe('AuthReducer', () => {
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
        args: {body: {email: 'test@example.com'}},
      });

      const {state, expectedState} = createTestingState({
        action,
        reducer,
        initialState,
        callState: CallState.LOADING,
      });

      expect(state).toEqual(expectedState);
    });
  });

  // describe('fetchSignInMethodsForEmail.success action', () => {
  //   it('should update the state in an immutable way', () => {
  //     const action = Actions.fetchSignInMethodsForEmail.success({
  //       args: { body: { email: 'test@example.com' } },
  //       response: ['test'],
  //     });

  //     const { state, expectedState } = createTestingState({
  //       action,
  //       reducer,
  //       initialState,
  //       callState: CallState.SUCCESS,
  //     });

  //     expect(state).toEqual(expectedState);
  //   });
  // });

  // describe('fetchSignInMethodsForEmail.failure action', () => {
  //   it('should update the state in an immutable way', () => {
  //     const action = Actions.fetchSignInMethodsForEmail.failure({
  //       args: { body: { email: 'test@example.com' } },
  //       error: {
  //         data: null,
  //         message: 'test error',
  //         status: 'error',
  //       },
  //     });

  //     const { state, expectedState } = createTestingState({
  //       action,
  //       reducer,
  //       initialState,
  //       callState: CallState.ERROR,
  //     });

  //     expect(state).toEqual(expectedState);
  //   });
  // });
});
