import {Injectable} from '@angular/core';
import {Auth, authInstance$, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateEmail, updatePassword,} from '@angular/fire/auth';
import {FirebaseError, FirebaseUser} from '@setgo/types';
import {User, UserCredential} from 'firebase/auth';
import {from} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import * as Models from './auth.models';

@Injectable({providedIn: 'root'})
export class AuthService {
  private get _firebaseUser() {
    return authInstance$.pipe(
        map((user) => {
          if (!user.currentUser) {
            const error: FirebaseError = {
              code: 'auth/not-signed-in',
              isError: true,
              message: 'Currently no user is signed in',
            };
            throw error;
          }
          return user.currentUser;
        }),
    );
  }

  constructor(private _firebaseAuth: Auth) {}

  signInWithEmailAndPassword({body}: Models.SignInWithEmailAndPasswordArgs) {
    return from(
               signInWithEmailAndPassword(this._firebaseAuth, body.email, body.password),
               )
        .pipe(
            map(
                (userCredential) => this._mapUserCredentialToFirebaseUser(userCredential),
                ),
        );
  }

  fetchSignInMethodsForEmail({body}: Models.FetchSignInMethodsForEmailArgs) {
    return from(
               fetchSignInMethodsForEmail(this._firebaseAuth, body.email),
               )
        .pipe(
            map((methods) => {
              if (methods.length) {
                return methods;
              }

              const error: FirebaseError = {
                code: 'auth/user-has-no-sign-in-methods',
                isError: true,
                message: 'The user does not have any sign in methods',
              };
              throw error;
            }),
        );
  }

  signOut() {
    return from(this._firebaseAuth.signOut()).pipe(map(() => null));
  }

  createUserWithEmailAndPassword({
    body,
  }: Models.CreateUserWithEmailAndPasswordArgs) {
    return from(
               createUserWithEmailAndPassword(
                   this._firebaseAuth,
                   body.email,
                   body.password,
                   ),
               )
        .pipe(
            map(
                (userCredential) => this._mapUserCredentialToFirebaseUser(userCredential),
                ),
        );
  }

  sendPasswordResetEmail({body}: Models.SendPasswordResetEmailArgs) {
    return from(sendPasswordResetEmail(this._firebaseAuth, body.email))
        .pipe(
            map(() => null),
        );
  }

  deleteUser() {
    return this._firebaseUser.pipe(
        switchMap((u) => u.delete()),
        map(() => null),
    );
  }

  getUserIdToken({body}: Models.GetUserIdTokenArgs) {
    return this._firebaseUser.pipe(
        switchMap((u) => u.getIdToken(body.forceRefresh)),
    );
  }

  reloadUser() {
    return this._firebaseUser.pipe(
        switchMap((u) => u.reload()),
        switchMap(
            () => this._firebaseUser.pipe(
                map((user) => this._mapUserToFirebaseUser(user)),
                ),
            ),
    );
  }

  sendUserEmailVerification() {
    return this._firebaseUser.pipe(switchMap((u) => sendEmailVerification(u)))
        .pipe(map(() => null));
  }

  updateUserEmail({body}: Models.UpdateUserEmailArgs) {
    return this._firebaseUser.pipe(
        switchMap((u) => updateEmail(u, body.email)),
        map(() => null),
    );
  }

  updateUserPassword({body}: Models.UpdateUserPasswordArgs) {
    return this._firebaseUser.pipe(
        switchMap((u) => updatePassword(u, body.password)),
        map(() => null),
    );
  }

  private _mapUserCredentialToFirebaseUser(userCredential: UserCredential) {
    if (!userCredential.user) {
      const error: FirebaseError = {
        code: 'auth/user-invalid',
        isError: true,
        message: 'The user does not exist',
      };
      throw error;
    }

    if (!userCredential.user.email) {
      const error: FirebaseError = {
        code: 'auth/user-email-missing',
        isError: true,
        message: 'The user does not have an email',
      };
      throw error;
    }

    const user: FirebaseUser = {
      email: userCredential.user.email,
      emailVerified: userCredential.user.emailVerified,
      uid: userCredential.user.uid,
    };

    return user;
  }

  private _mapUserToFirebaseUser(user: User) {
    if (!user.email) {
      const error: FirebaseError = {
        code: 'auth/user-email-missing',
        isError: true,
        message: 'The user does not have an email',
      };
      throw error;
    }

    const firebaseUser: FirebaseUser = {
      email: user.email,
      emailVerified: user.emailVerified,
      uid: user.uid,
    };

    return firebaseUser;
  }
}
