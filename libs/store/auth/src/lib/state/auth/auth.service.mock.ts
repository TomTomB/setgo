import * as fromModels from './auth.models';
import { FirebaseUser } from '@setgo/types';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthMockService {
  postSignIn({ body }: fromModels.PostSignInArgs) {
    const user: FirebaseUser = {
      email: body.email,
      emailVerified: false,
      uid: 'test1234',
    };

    return of(user);
  }

  postSignInMethodsForEmail({
    body,
  }: fromModels.PostSignInMethodsForEmailArgs) {
    return of(['google', body.email]);
  }
}
