import * as AuthActions from './auth.actions';
import * as Models from './auth.models';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AuthEffects } from './auth.effects';
import { AuthService } from './auth.service';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { marbles } from 'rxjs-marbles/jest';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('AuthEffects', () => {
  let actions: Observable<unknown>;
  let effects: AuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp({}), AngularFireAuthModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            postSignIn(args: Models.PostSignInArgs) {
              if (args.body.email === 'error') {
                return throwError({
                  error: null,
                  message: 'test error',
                  status: 'test',
                });
              }

              return of({
                email: 'test@example.com',
                emailVerified: false,
                uid: 'abc123',
              });
            },
            postSignInMethodsForEmail(
              args: Models.PostSignInMethodsForEmailArgs,
            ) {
              if (args.body.email === 'error') {
                return throwError({
                  error: null,
                  message: 'test error',
                  status: 'test',
                });
              }

              return of(['google']);
            },
          },
        },
        AuthEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  describe('postSignIn$', () => {
    it(
      'should work',
      marbles((m) => {
        const callAction = AuthActions.postSignIn.call({
          args: { body: { email: 'test@example.com', password: 'test1234' } },
        });
        const expectedAction = AuthActions.postSignIn.success({
          args: callAction.args,
          response: {
            email: 'test@example.com',
            emailVerified: false,
            uid: 'abc123',
          },
        });

        actions = m.hot('-a-|', { a: callAction });
        m.expect(effects.postSignIn$).toBeObservable('-a-|', {
          a: expectedAction,
        });
      }),
    );

    it(
      'should error',
      marbles((m) => {
        const callAction = AuthActions.postSignIn.call({
          args: { body: { email: 'error', password: 'test1234' } },
        });
        const expectedAction = AuthActions.postSignIn.failure({
          args: callAction.args,
          error: {
            data: null,
            message: 'test error',
            status: 'test',
          },
        });

        actions = m.hot('-a-|', { a: callAction });
        m.expect(effects.postSignIn$).toBeObservable('-a-|', {
          a: expectedAction,
        });
      }),
    );
  });

  describe('postSignInMethodsForEmail$', () => {
    it(
      'should work',
      marbles((m) => {
        const callAction = AuthActions.postSignInMethodsForEmail.call({
          args: { body: { email: 'test@example.com' } },
        });
        const expectedAction = AuthActions.postSignInMethodsForEmail.success({
          args: callAction.args,
          response: ['google'],
        });

        actions = m.hot('-a-|', { a: callAction });
        m.expect(effects.postSignInMethodsForEmail$).toBeObservable('-a-|', {
          a: expectedAction,
        });
      }),
    );

    it(
      'should error',
      marbles((m) => {
        const callAction = AuthActions.postSignInMethodsForEmail.call({
          args: { body: { email: 'error' } },
        });
        const expectedAction = AuthActions.postSignInMethodsForEmail.failure({
          args: callAction.args,
          error: {
            data: null,
            message: 'test error',
            status: 'test',
          },
        });

        actions = m.hot('-a-|', { a: callAction });
        m.expect(effects.postSignInMethodsForEmail$).toBeObservable('-a-|', {
          a: expectedAction,
        });
      }),
    );
  });
});
