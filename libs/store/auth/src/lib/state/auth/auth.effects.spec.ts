import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {FirebaseError, FirebaseUser} from '@setgo/types';
import {Error} from '@tomtomb/ngrx-toolkit';
import {Observable, of, throwError} from 'rxjs';
import {marbles} from 'rxjs-marbles/jest';

import * as Actions from './auth.actions';
import {AuthEffects} from './auth.effects';
import {AuthService} from './auth.service';

describe('AuthEffects', () => {
  let actions: Observable<unknown>;
  let effects: AuthEffects;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            signInWithEmailAndPassword: jest.fn(),
            fetchSignInMethodsForEmail: jest.fn(),
            signOut: jest.fn(),
            createUserWithEmailAndPassword: jest.fn(),
            sendPasswordResetEmail: jest.fn(),
            deleteUser: jest.fn(),
            getUserIdToken: jest.fn(),
            reloadUser: jest.fn(),
            sendUserEmailVerification: jest.fn(),
            updateUserEmail: jest.fn(),
            updateUserPassword: jest.fn(),
          },
        },
        AuthEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService);
  });

  describe('deleteUser$', () => {
    it(
        'should work',
        marbles((m) => {
          jest.spyOn(authService, 'deleteUser').mockReturnValue(of(null));

          const callAction = Actions.deleteUser.call({args: null});
          const expectedAction = Actions.deleteUser.success({
            args: callAction.args,
            response: null,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.deleteUser$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );

    it(
        'should error',
        marbles((m) => {
          const firebaseError: FirebaseError = {
            message: 'test error',
            code: 'test',
            isError: true,
          };
          const error: Error = {
            data: null,
            message: 'test error',
            status: 'test',
          };

          jest.spyOn(authService, 'deleteUser').mockReturnValue(throwError(firebaseError));

          const callAction = Actions.deleteUser.call({
            args: null,
          });
          const expectedAction = Actions.deleteUser.failure({
            args: callAction.args,
            error,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.deleteUser$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );
  });

  describe('fetchSignInMethodsForEmail$', () => {
    it(
        'should work',
        marbles((m) => {
          const email = 'test@example.com';
          const response = ['google'];

          jest.spyOn(authService, 'fetchSignInMethodsForEmail').mockReturnValue(of(response));

          const callAction = Actions.fetchSignInMethodsForEmail.call({
            args: {body: {email}},
          });
          const expectedAction = Actions.fetchSignInMethodsForEmail.success({
            args: callAction.args,
            response,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.fetchSignInMethodsForEmail$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );

    it(
        'should error',
        marbles((m) => {
          const email = 'test@example.com';
          const firebaseError: FirebaseError = {
            message: 'test error',
            code: 'test',
            isError: true,
          };
          const error: Error = {
            data: null,
            message: 'test error',
            status: 'test',
          };

          jest.spyOn(authService, 'fetchSignInMethodsForEmail')
              .mockReturnValue(throwError(firebaseError));

          const callAction = Actions.fetchSignInMethodsForEmail.call({
            args: {body: {email}},
          });
          const expectedAction = Actions.fetchSignInMethodsForEmail.failure({
            args: callAction.args,
            error,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.fetchSignInMethodsForEmail$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );
  });

  describe('getUserIdToken$', () => {
    it(
        'should work',
        marbles((m) => {
          const idToken = 'abc123';

          jest.spyOn(authService, 'getUserIdToken').mockReturnValue(of(idToken));

          const callAction = Actions.getUserIdToken.call({
            args: {body: {forceRefresh: false}},
          });
          const expectedAction = Actions.getUserIdToken.success({
            args: callAction.args,
            response: idToken,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.getUserIdToken$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );

    it(
        'should error',
        marbles((m) => {
          const firebaseError: FirebaseError = {
            message: 'test error',
            code: 'test',
            isError: true,
          };
          const error: Error = {
            data: null,
            message: 'test error',
            status: 'test',
          };

          jest.spyOn(authService, 'getUserIdToken').mockReturnValue(throwError(firebaseError));

          const callAction = Actions.getUserIdToken.call({
            args: {body: {forceRefresh: false}},
          });
          const expectedAction = Actions.getUserIdToken.failure({
            args: callAction.args,
            error,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.getUserIdToken$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );
  });

  describe('reloadUser$', () => {
    it(
        'should work',
        marbles((m) => {
          const firebaseUser: FirebaseUser = {
            email: 'test@example.com',
            emailVerified: false,
            uid: 'abc123',
          };

          jest.spyOn(authService, 'reloadUser').mockReturnValue(of(firebaseUser));

          const callAction = Actions.reloadUser.call({
            args: null,
          });
          const expectedAction = Actions.reloadUser.success({
            args: callAction.args,
            response: firebaseUser,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.reloadUser$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );

    it(
        'should error',
        marbles((m) => {
          const firebaseError: FirebaseError = {
            message: 'test error',
            code: 'test',
            isError: true,
          };
          const error: Error = {
            data: null,
            message: 'test error',
            status: 'test',
          };

          jest.spyOn(authService, 'reloadUser').mockReturnValue(throwError(firebaseError));

          const callAction = Actions.reloadUser.call({
            args: null,
          });
          const expectedAction = Actions.reloadUser.failure({
            args: callAction.args,
            error,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.reloadUser$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );
  });

  describe('sendPasswordResetEmail$', () => {
    it(
        'should work',
        marbles((m) => {
          const email = 'test@example.com';

          jest.spyOn(authService, 'sendPasswordResetEmail').mockReturnValue(of(null));

          const callAction = Actions.sendPasswordResetEmail.call({
            args: {body: {email}},
          });
          const expectedAction = Actions.sendPasswordResetEmail.success({
            args: callAction.args,
            response: null,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.sendPasswordResetEmail$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );

    it(
        'should error',
        marbles((m) => {
          const firebaseError: FirebaseError = {
            message: 'test error',
            code: 'test',
            isError: true,
          };
          const error: Error = {
            data: null,
            message: 'test error',
            status: 'test',
          };
          const email = 'test@example.com';

          jest.spyOn(authService, 'sendPasswordResetEmail')
              .mockReturnValue(throwError(firebaseError));

          const callAction = Actions.sendPasswordResetEmail.call({
            args: {body: {email}},
          });
          const expectedAction = Actions.sendPasswordResetEmail.failure({
            args: callAction.args,
            error,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.sendPasswordResetEmail$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );
  });

  describe('sendUserEmailVerification$', () => {
    it(
        'should work',
        marbles((m) => {
          jest.spyOn(authService, 'sendUserEmailVerification').mockReturnValue(of(null));

          const callAction = Actions.sendUserEmailVerification.call({
            args: null,
          });
          const expectedAction = Actions.sendUserEmailVerification.success({
            args: callAction.args,
            response: null,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.sendUserEmailVerification$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );

    it(
        'should error',
        marbles((m) => {
          const firebaseError: FirebaseError = {
            message: 'test error',
            code: 'test',
            isError: true,
          };
          const error: Error = {
            data: null,
            message: 'test error',
            status: 'test',
          };

          jest.spyOn(authService, 'sendUserEmailVerification')
              .mockReturnValue(throwError(firebaseError));

          const callAction = Actions.sendUserEmailVerification.call({
            args: null,
          });
          const expectedAction = Actions.sendUserEmailVerification.failure({
            args: callAction.args,
            error,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.sendUserEmailVerification$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );
  });

  describe('signInWithEmailAndPassword$', () => {
    it(
        'should work',
        marbles((m) => {
          const firebaseUser: FirebaseUser = {
            email: 'test@example.com',
            emailVerified: false,
            uid: 'abc123',
          };
          const credentials = {email: 'test@example.com', password: 'test1234'};

          jest.spyOn(authService, 'signInWithEmailAndPassword').mockReturnValue(of(firebaseUser));

          const callAction = Actions.signInWithEmailAndPassword.call({
            args: {body: credentials},
          });
          const expectedAction = Actions.signInWithEmailAndPassword.success({
            args: callAction.args,
            response: firebaseUser,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.signInWithEmailAndPassword$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );

    it(
        'should error',
        marbles((m) => {
          const firebaseError: FirebaseError = {
            message: 'test error',
            code: 'test',
            isError: true,
          };
          const error: Error = {
            data: null,
            message: 'test error',
            status: 'test',
          };
          const credentials = {email: 'test@example.com', password: 'test1234'};

          jest.spyOn(authService, 'signInWithEmailAndPassword')
              .mockReturnValue(throwError(firebaseError));

          const callAction = Actions.signInWithEmailAndPassword.call({
            args: {body: credentials},
          });
          const expectedAction = Actions.signInWithEmailAndPassword.failure({
            args: callAction.args,
            error,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.signInWithEmailAndPassword$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );
  });

  describe('signOut$', () => {
    it(
        'should work',
        marbles((m) => {
          jest.spyOn(authService, 'signOut').mockReturnValue(of(null));

          const callAction = Actions.signOut.call({
            args: null,
          });
          const expectedAction = Actions.signOut.success({
            args: callAction.args,
            response: null,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.signOut$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );

    it(
        'should error',
        marbles((m) => {
          const firebaseError: FirebaseError = {
            message: 'test error',
            code: 'test',
            isError: true,
          };
          const error: Error = {
            data: null,
            message: 'test error',
            status: 'test',
          };

          jest.spyOn(authService, 'signOut').mockReturnValue(throwError(firebaseError));

          const callAction = Actions.signOut.call({
            args: null,
          });
          const expectedAction = Actions.signOut.failure({
            args: callAction.args,
            error,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.signOut$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );
  });

  describe('updateUserEmail$', () => {
    it(
        'should work',
        marbles((m) => {
          const email = 'test@example.com';

          jest.spyOn(authService, 'updateUserEmail').mockReturnValue(of(null));

          const callAction = Actions.updateUserEmail.call({
            args: {body: {email}},
          });
          const expectedAction = Actions.updateUserEmail.success({
            args: callAction.args,
            response: null,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.updateUserEmail$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );

    it(
        'should error',
        marbles((m) => {
          const firebaseError: FirebaseError = {
            message: 'test error',
            code: 'test',
            isError: true,
          };
          const error: Error = {
            data: null,
            message: 'test error',
            status: 'test',
          };
          const email = 'test@example.com';

          jest.spyOn(authService, 'updateUserEmail').mockReturnValue(throwError(firebaseError));

          const callAction = Actions.updateUserEmail.call({
            args: {body: {email}},
          });
          const expectedAction = Actions.updateUserEmail.failure({
            args: callAction.args,
            error,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.updateUserEmail$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );
  });

  describe('updateUserPassword$', () => {
    it(
        'should work',
        marbles((m) => {
          const password = 'abc123';

          jest.spyOn(authService, 'updateUserPassword').mockReturnValue(of(null));

          const callAction = Actions.updateUserPassword.call({
            args: {body: {password}},
          });
          const expectedAction = Actions.updateUserPassword.success({
            args: callAction.args,
            response: null,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.updateUserPassword$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );

    it(
        'should error',
        marbles((m) => {
          const firebaseError: FirebaseError = {
            message: 'test error',
            code: 'test',
            isError: true,
          };
          const error: Error = {
            data: null,
            message: 'test error',
            status: 'test',
          };
          const password = 'abc123';

          jest.spyOn(authService, 'updateUserPassword').mockReturnValue(throwError(firebaseError));

          const callAction = Actions.updateUserPassword.call({
            args: {body: {password}},
          });
          const expectedAction = Actions.updateUserPassword.failure({
            args: callAction.args,
            error,
          });

          actions = m.hot('-a-|', {a: callAction});
          m.expect(effects.updateUserPassword$).toBeObservable('-a-|', {
            a: expectedAction,
          });
        }),
    );
  });
});
