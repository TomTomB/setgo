// import * as AuthActions from './auth.actions';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireModule } from '@angular/fire';
// import { AuthEffects } from './auth.effects';
// import { Observable } from 'rxjs';
// import { TestBed } from '@angular/core/testing';
// import { TestScheduler } from 'rxjs/testing';
// import { hot as hotti } from '@nrwl/angular/testing';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { provideMockStore } from '@ngrx/store/testing';

// describe('AuthEffects', () => {
//   let actions: Observable<unknown>;
//   let effects: AuthEffects;
//   let testScheduler: TestScheduler;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [AngularFireModule.initializeApp({}), AngularFireAuthModule],
//       providers: [
//         AuthEffects,
//         provideMockActions(() => actions),
//         provideMockStore(),
//       ],
//     });

//     effects = TestBed.inject(AuthEffects);

//     testScheduler = new TestScheduler((actual, expected) => {
//       expect(actual).toEqual(expected);
//     });
//   });

//   describe('postSignIn$', () => {
//     hotti('-a-|');

//     it('should work', () => {
//       const callProps = {
//         args: { body: { email: 'test@example.com', password: 'test1234' } },
//       };
//       const successProps = {
//         args: callProps.args,
//         response: {
//           email: 'test@example.com',
//           emailVerified: false,
//           uid: 'abc123',
//         },
//       };

//       testScheduler.run((helpers) => {
//         const { hot, expectObservable } = helpers;

//         actions = hot('-a-|', { a: AuthActions.postSignIn.call(callProps) });

//         expectObservable(effects.postSignIn$).toBe('-a-|', {
//           a: AuthActions.postSignIn.success(successProps),
//         });
//       });
//     });
//   });
// });
