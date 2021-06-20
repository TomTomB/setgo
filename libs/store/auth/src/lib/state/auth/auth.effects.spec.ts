import * as AuthActions from './auth.actions';
import { AuthEffects } from './auth.effects';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { marbles } from 'rxjs-marbles/jest';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('AuthEffects', () => {
  let actions: Observable<unknown>;
  let effects: AuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            postSignIn() {
              return of({
                email: 'test@example.com',
                emailVerified: false,
                uid: 'abc123',
              });
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
        const callProps = {
          args: { body: { email: 'test@example.com', password: 'test1234' } },
        };
        const successProps = {
          args: callProps.args,
          response: {
            email: 'test@example.com',
            emailVerified: false,
            uid: 'abc123',
          },
        };

        actions = m.hot('-a-|', { a: AuthActions.postSignIn.call(callProps) });
        m.expect(effects.postSignIn$).toBeObservable('-a-|', {
          a: AuthActions.postSignIn.success(successProps),
        });
      }),
    );
  });
});
