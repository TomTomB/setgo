import * as Models from './auth.models';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseError, FirebaseUser } from '@setgo/types';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private get _firebaseUser() {
    return this._firebaseAuth.user.pipe(
      map((user) => {
        if (!user) {
          const error: FirebaseError = {
            code: 'auth/not-signed-in',
            isError: true,
            message: 'Currently no user is signed in',
          };
          throw error;
        }
        return user;
      }),
    );
  }

  constructor(private _firebaseAuth: AngularFireAuth) {}

  signInWithEmailAndPassword({ body }: Models.SignInWithEmailAndPasswordArgs) {
    return from(
      this._firebaseAuth.signInWithEmailAndPassword(body.email, body.password),
    ).pipe(
      map((userCredential) =>
        this._mapUserCredentialToFirebaseUser(userCredential),
      ),
    );
  }

  fetchSignInMethodsForEmail({ body }: Models.FetchSignInMethodsForEmailArgs) {
    return from(this._firebaseAuth.fetchSignInMethodsForEmail(body.email));
  }

  signOut() {
    return from(this._firebaseAuth.signOut()).pipe(map(() => null));
  }

  createUserWithEmailAndPassword({
    body,
  }: Models.CreateUserWithEmailAndPasswordArgs) {
    return from(
      this._firebaseAuth.createUserWithEmailAndPassword(
        body.email,
        body.password,
      ),
    ).pipe(
      map((userCredential) =>
        this._mapUserCredentialToFirebaseUser(userCredential),
      ),
    );
  }

  sendPasswordResetEmail({ body }: Models.SendPasswordResetEmailArgs) {
    return from(this._firebaseAuth.sendPasswordResetEmail(body.email)).pipe(
      map(() => null),
    );
  }

  deleteUser() {
    return this._firebaseUser.pipe(
      switchMap((u) => u.delete()),
      map(() => null),
    );
  }

  getUserIdToken({ body }: Models.GetUserIdTokenArgs) {
    return this._firebaseUser.pipe(
      switchMap((u) => u.getIdToken(body.forceRefresh)),
    );
  }

  reloadUser() {
    return this._firebaseUser.pipe(
      switchMap((u) => u.reload()),
      switchMap(() =>
        this._firebaseUser.pipe(
          map((user) => this._mapUserToFirebaseUser(user)),
        ),
      ),
    );
  }

  sendUserEmailVerification() {
    return this._firebaseUser
      .pipe(switchMap((u) => u.sendEmailVerification()))
      .pipe(map(() => null));
  }

  updateUserEmail({ body }: Models.UpdateUserEmailArgs) {
    return this._firebaseUser.pipe(
      switchMap((u) => u.updateEmail(body.email)),
      map(() => null),
    );
  }

  updateUserPassword({ body }: Models.UpdateUserPasswordArgs) {
    return this._firebaseUser.pipe(
      switchMap((u) => u.updatePassword(body.password)),
      map(() => null),
    );
  }

  private _mapUserCredentialToFirebaseUser(
    userCredential: firebase.default.auth.UserCredential,
  ) {
    if (!userCredential.user) {
      const error: FirebaseError = {
        code: 'auth/user-invalid',
        isError: true,
        message: 'The user does not exist',
      };
      throw error;
    }

    if (!userCredential.user?.email) {
      const error: FirebaseError = {
        code: 'auth/user-email-missing',
        isError: true,
        message: 'The user does not have an email',
      };
      throw error;
    }

    const user: FirebaseUser = {
      email: userCredential.user?.email,
      emailVerified: userCredential.user?.emailVerified,
      uid: userCredential.user?.uid,
    };

    return user;
  }

  private _mapUserToFirebaseUser(user: firebase.default.User) {
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
