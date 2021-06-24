import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { FirebaseUser } from '@setgo/types';
import { TestBed } from '@angular/core/testing';

describe('AuthEffects', () => {
  let authService: AuthService;
  let angularFireAuth: AngularFireAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFireAuth,
          useValue: {
            signInWithEmailAndPassword: jest.fn(),
          },
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    angularFireAuth = TestBed.inject(AngularFireAuth);
  });

  describe('signInWithEmailAndPassword$', () => {
    it('should work', (done) => {
      const email = 'test@test.de';
      const password = 'test1234';

      const expectedResult: FirebaseUser = {
        email,
        emailVerified: false,
        uid: 'abc123',
      };

      jest.spyOn(angularFireAuth, 'signInWithEmailAndPassword').mockReturnValue(
        new Promise((resolve) =>
          resolve({
            user: {
              email,
              emailVerified: false,
              uid: 'abc123',
            },
          } as any),
        ),
      );

      const result = authService.signInWithEmailAndPassword({
        body: { email, password },
      });

      expect(angularFireAuth.signInWithEmailAndPassword).toBeCalledWith(
        email,
        password,
      );

      result.subscribe((r) => {
        expect(r).toEqual(expectedResult);
        done();
      });
    });
  });
});
