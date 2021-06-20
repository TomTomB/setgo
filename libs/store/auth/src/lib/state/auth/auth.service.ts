import * as fromModels from './auth.models';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseError, FirebaseUser } from '@setgo/types';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _firebaseAuth: AngularFireAuth) {}

  postSignIn({ body }: fromModels.PostSignInArgs) {
    return from(
      this._firebaseAuth.signInWithEmailAndPassword(body.email, body.password),
    ).pipe(
      map((userCredential) => {
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
      }),
    );
  }

  postSignInMethodsForEmail({
    body,
  }: fromModels.PostSignInMethodsForEmailArgs) {
    return from(this._firebaseAuth.fetchSignInMethodsForEmail(body.email));
  }
}
