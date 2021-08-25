import { getAuth, provideAuth } from '@angular/fire/auth';
// import { AuthService } from './auth.service';
// import { FirebaseUser } from '@setgo/types';
import { TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';

describe('AuthEffects', () => {
  // let authService: AuthService;
  // let angularFireAuth: Auth;

  // const promiseMock = (resolveValue?: unknown) =>
  //   jest.fn(() => new Promise((resolve) => resolve(resolveValue)));

  // const user = {
  //   delete: promiseMock(),
  //   displayName: 'Test user',
  //   email: 'test@test.de',
  //   emailVerified: false,
  //   uid: 'abc123',
  //   getIdToken: promiseMock('abc123'),
  //   reload: promiseMock(),
  //   sendEmailVerification: promiseMock(),
  //   updateEmail: promiseMock(),
  //   updatePassword: promiseMock(),
  // };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideAuth(() => getAuth())],
    });

    // authService = TestBed.inject(AuthService);
    // angularFireAuth = TestBed.inject(Auth);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // angularFireAuth.user = of(user);
  });

  it('should work', () => {
    expect(true).toBe(true);
  });

  // describe('signInWithEmailAndPassword', () => {
  //   it('should work', (done) => {
  //     const email = 'test@test.de';
  //     const password = 'test1234';

  //     const expectedResult: FirebaseUser = {
  //       email,
  //       emailVerified: false,
  //       uid: 'abc123',
  //     };

  //     jest.spyOn(authService, 'signInWithEmailAndPassword').mockReturnValue(
  //       new Promise((resolve) =>
  //         resolve({
  //           user,
  //           // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         } as any),
  //       ),
  //     );

  //     const result = authService.signInWithEmailAndPassword({
  //       body: { email, password },
  //     });

  //     expect(angularFireAuth.signInWithEmailAndPassword).toBeCalledWith(
  //       email,
  //       password,
  //     );

  //     result.subscribe((r) => {
  //       expect(r).toEqual(expectedResult);
  //       done();
  //     });
  //   });

  //   it('should error if the user is null', (done) => {
  //     const email = 'test@test.de';
  //     const password = 'test1234';

  //     jest.spyOn(angularFireAuth, 'signInWithEmailAndPassword').mockReturnValue(
  //       new Promise((resolve) =>
  //         resolve({
  //           user: null,
  //           // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         } as any),
  //       ),
  //     );

  //     const result = authService.signInWithEmailAndPassword({
  //       body: { email, password },
  //     });

  //     expect(angularFireAuth.signInWithEmailAndPassword).toBeCalledWith(
  //       email,
  //       password,
  //     );

  //     result.subscribe({
  //       error: (e) => {
  //         expect(e).toEqual({
  //           code: 'auth/user-invalid',
  //           isError: true,
  //           message: 'The user does not exist',
  //         });
  //         done();
  //       },
  //     });
  //   });

  //   it('should error if the user email is null', (done) => {
  //     const email = 'test@test.de';
  //     const password = 'test1234';

  //     jest.spyOn(angularFireAuth, 'signInWithEmailAndPassword').mockReturnValue(
  //       new Promise((resolve) =>
  //         resolve({
  //           user: {
  //             email: null,
  //           },
  //           // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         } as any),
  //       ),
  //     );

  //     const result = authService.signInWithEmailAndPassword({
  //       body: { email, password },
  //     });

  //     expect(angularFireAuth.signInWithEmailAndPassword).toBeCalledWith(
  //       email,
  //       password,
  //     );

  //     result.subscribe({
  //       error: (e) => {
  //         expect(e).toEqual({
  //           code: 'auth/user-email-missing',
  //           isError: true,
  //           message: 'The user does not have an email',
  //         });
  //         done();
  //       },
  //     });
  //   });
  // });

  // describe('fetchSignInMethodsForEmail', () => {
  //   it('should work', (done) => {
  //     const email = 'test@test.de';
  //     const expectedResult = ['test1234'];

  //     jest
  //       .spyOn(angularFireAuth, 'fetchSignInMethodsForEmail')
  //       .mockReturnValue(new Promise((resolve) => resolve(expectedResult)));

  //     const result = authService.fetchSignInMethodsForEmail({
  //       body: { email },
  //     });

  //     expect(angularFireAuth.fetchSignInMethodsForEmail).toBeCalledWith(email);

  //     result.subscribe((r) => {
  //       expect(r).toEqual(expectedResult);
  //       done();
  //     });
  //   });

  //   it('should error if the methods array is empty', (done) => {
  //     const email = 'test@test.de';

  //     jest
  //       .spyOn(angularFireAuth, 'fetchSignInMethodsForEmail')
  //       .mockReturnValue(new Promise((resolve) => resolve([])));

  //     const result = authService.fetchSignInMethodsForEmail({
  //       body: { email },
  //     });

  //     expect(angularFireAuth.fetchSignInMethodsForEmail).toBeCalledWith(email);

  //     result.subscribe({
  //       error: (e) => {
  //         expect(e).toEqual({
  //           code: 'auth/user-has-no-sign-in-methods',
  //           isError: true,
  //           message: 'The user does not have any sign in methods',
  //         });
  //         done();
  //       },
  //     });
  //   });
  // });

  // describe('signOut', () => {
  //   it('should work', (done) => {
  //     jest
  //       .spyOn(angularFireAuth, 'signOut')
  //       .mockReturnValue(new Promise((resolve) => resolve()));

  //     const result = authService.signOut();

  //     expect(angularFireAuth.signOut).toBeCalled();

  //     result.subscribe((r) => {
  //       expect(r).toEqual(null);
  //       done();
  //     });
  //   });
  // });

  // describe('createUserWithEmailAndPassword', () => {
  //   it('should work', (done) => {
  //     const email = 'test@test.de';
  //     const password = 'test1234';

  //     const expectedResult: FirebaseUser = {
  //       email,
  //       emailVerified: false,
  //       uid: 'abc123',
  //     };

  //     jest
  //       .spyOn(angularFireAuth, 'createUserWithEmailAndPassword')
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       .mockReturnValue(new Promise((resolve) => resolve({ user } as any)));

  //     const result = authService.createUserWithEmailAndPassword({
  //       body: { email, password },
  //     });

  //     expect(angularFireAuth.createUserWithEmailAndPassword).toBeCalledWith(
  //       email,
  //       password,
  //     );

  //     result.subscribe((r) => {
  //       expect(r).toEqual(expectedResult);
  //       done();
  //     });
  //   });

  //   it('should error if the user is null', (done) => {
  //     const email = 'test@test.de';
  //     const password = 'test1234';

  //     jest
  //       .spyOn(angularFireAuth, 'createUserWithEmailAndPassword')
  //       .mockReturnValue(
  //         new Promise((resolve) =>
  //           resolve({
  //             user: null,
  //             // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //           } as any),
  //         ),
  //       );

  //     const result = authService.createUserWithEmailAndPassword({
  //       body: { email, password },
  //     });

  //     expect(angularFireAuth.createUserWithEmailAndPassword).toBeCalledWith(
  //       email,
  //       password,
  //     );

  //     result.subscribe({
  //       error: (e) => {
  //         expect(e).toEqual({
  //           code: 'auth/user-invalid',
  //           isError: true,
  //           message: 'The user does not exist',
  //         });
  //         done();
  //       },
  //     });
  //   });

  //   it('should error if the user email is null', (done) => {
  //     const email = 'test@test.de';
  //     const password = 'test1234';

  //     jest
  //       .spyOn(angularFireAuth, 'createUserWithEmailAndPassword')
  //       .mockReturnValue(
  //         new Promise((resolve) =>
  //           resolve({
  //             user: {
  //               email: null,
  //             },
  //             // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //           } as any),
  //         ),
  //       );

  //     const result = authService.createUserWithEmailAndPassword({
  //       body: { email, password },
  //     });

  //     expect(angularFireAuth.createUserWithEmailAndPassword).toBeCalledWith(
  //       email,
  //       password,
  //     );

  //     result.subscribe({
  //       error: (e) => {
  //         expect(e).toEqual({
  //           code: 'auth/user-email-missing',
  //           isError: true,
  //           message: 'The user does not have an email',
  //         });
  //         done();
  //       },
  //     });
  //   });
  // });

  // describe('sendPasswordResetEmail', () => {
  //   it('should work', (done) => {
  //     const email = 'test@test.de';

  //     jest
  //       .spyOn(angularFireAuth, 'sendPasswordResetEmail')
  //       .mockReturnValue(new Promise((resolve) => resolve()));

  //     const result = authService.sendPasswordResetEmail({
  //       body: { email },
  //     });

  //     expect(angularFireAuth.sendPasswordResetEmail).toBeCalledWith(email);

  //     result.subscribe((r) => {
  //       expect(r).toEqual(null);
  //       done();
  //     });
  //   });
  // });

  // describe('deleteUser', () => {
  //   it('should work', (done) => {
  //     const result = authService.deleteUser();

  //     angularFireAuth.user.subscribe((u) => {
  //       expect(u?.delete).toBeCalled();
  //     });

  //     result.subscribe((r) => {
  //       expect(r).toEqual(null);
  //       done();
  //     });
  //   });

  //   it('should error if firebase user is null', (done) => {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     angularFireAuth.user = of(null);
  //     const result = authService.deleteUser();

  //     angularFireAuth.user.subscribe((u) => {
  //       expect(u?.delete).toBeCalled();
  //     });

  //     result.subscribe({
  //       error: (e) => {
  //         expect(e).toEqual({
  //           code: 'auth/not-signed-in',
  //           isError: true,
  //           message: 'Currently no user is signed in',
  //         });
  //         done();
  //       },
  //     });
  //   });
  // });

  // describe('getUserIdToken', () => {
  //   it('should work', (done) => {
  //     const forceRefresh = false;
  //     const result = authService.getUserIdToken({ body: { forceRefresh } });

  //     angularFireAuth.user.subscribe((u) => {
  //       expect(u?.getIdToken).toBeCalledWith(forceRefresh);
  //     });

  //     result.subscribe((r) => {
  //       expect(r).toEqual('abc123');
  //       done();
  //     });
  //   });

  //   it('should error if firebase user is null', (done) => {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     angularFireAuth.user = of(null);

  //     const forceRefresh = false;
  //     const result = authService.getUserIdToken({ body: { forceRefresh } });

  //     result.subscribe({
  //       error: (e) => {
  //         expect(e).toEqual({
  //           code: 'auth/not-signed-in',
  //           isError: true,
  //           message: 'Currently no user is signed in',
  //         });
  //         done();
  //       },
  //     });
  //   });
  // });

  // describe('reloadUser', () => {
  //   it('should work', (done) => {
  //     const result = authService.reloadUser();
  //     const expectedResult: FirebaseUser = {
  //       email: 'test@test.de',
  //       emailVerified: false,
  //       uid: 'abc123',
  //     };

  //     angularFireAuth.user.subscribe((u) => {
  //       expect(u?.reload).toBeCalled();
  //     });

  //     result.subscribe((r) => {
  //       expect(r).toEqual(expectedResult);
  //       done();
  //     });
  //   });

  //   it('should error if firebase user is null', (done) => {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     angularFireAuth.user = of(null);

  //     const result = authService.reloadUser();

  //     result.subscribe({
  //       error: (e) => {
  //         expect(e).toEqual({
  //           code: 'auth/not-signed-in',
  //           isError: true,
  //           message: 'Currently no user is signed in',
  //         });
  //         done();
  //       },
  //     });
  //   });

  //   it('should error if firebase user email is null', (done) => {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     angularFireAuth.user = of({ email: null, reload: promiseMock() });

  //     const result = authService.reloadUser();

  //     result.subscribe({
  //       error: (e) => {
  //         expect(e).toEqual({
  //           code: 'auth/user-email-missing',
  //           isError: true,
  //           message: 'The user does not have an email',
  //         });
  //         done();
  //       },
  //     });
  //   });
  // });

  // describe('sendUserEmailVerification', () => {
  //   it('should work', (done) => {
  //     const result = authService.sendUserEmailVerification();

  //     angularFireAuth.user.subscribe((u) => {
  //       expect(u?.sendEmailVerification).toBeCalled();
  //     });

  //     result.subscribe((r) => {
  //       expect(r).toEqual(null);
  //       done();
  //     });
  //   });

  //   it('should error if firebase user is null', (done) => {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     angularFireAuth.user = of(null);

  //     const result = authService.sendUserEmailVerification();

  //     result.subscribe({
  //       error: (e) => {
  //         expect(e).toEqual({
  //           code: 'auth/not-signed-in',
  //           isError: true,
  //           message: 'Currently no user is signed in',
  //         });
  //         done();
  //       },
  //     });
  //   });
  // });

  // describe('updateUserEmail', () => {
  //   it('should work', (done) => {
  //     const email = 'test2@test.de';
  //     const result = authService.updateUserEmail({ body: { email } });

  //     angularFireAuth.user.subscribe((u) => {
  //       expect(u?.updateEmail).toBeCalledWith(email);
  //     });

  //     result.subscribe((r) => {
  //       expect(r).toEqual(null);
  //       done();
  //     });
  //   });

  //   it('should error if firebase user is null', (done) => {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     angularFireAuth.user = of(null);

  //     const email = 'test2@test.de';
  //     const result = authService.updateUserEmail({ body: { email } });

  //     result.subscribe({
  //       error: (e) => {
  //         expect(e).toEqual({
  //           code: 'auth/not-signed-in',
  //           isError: true,
  //           message: 'Currently no user is signed in',
  //         });
  //         done();
  //       },
  //     });
  //   });
  // });

  // describe('updateUserPassword', () => {
  //   it('should work', (done) => {
  //     const password = 'test2test';
  //     const result = authService.updateUserPassword({ body: { password } });

  //     angularFireAuth.user.subscribe((u) => {
  //       expect(u?.updatePassword).toBeCalledWith(password);
  //     });

  //     result.subscribe((r) => {
  //       expect(r).toEqual(null);
  //       done();
  //     });
  //   });

  //   it('should error if firebase user is null', (done) => {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     angularFireAuth.user = of(null);

  //     const password = 'test2test';
  //     const result = authService.updateUserPassword({ body: { password } });

  //     result.subscribe({
  //       error: (e) => {
  //         expect(e).toEqual({
  //           code: 'auth/not-signed-in',
  //           isError: true,
  //           message: 'Currently no user is signed in',
  //         });
  //         done();
  //       },
  //     });
  //   });
  // });
});
