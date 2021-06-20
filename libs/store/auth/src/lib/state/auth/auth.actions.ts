import * as fromModels from './auth.models';
import { FirebaseUser } from '@setgo/types';
import { createActionGroup } from '@tomtomb/ngrx-toolkit';

export const AUTH_ACTION_PREFIX = 'Auth';

export const postSignInMethodsForEmail = createActionGroup<
  fromModels.PostSignInMethodsForEmailArgs,
  string[]
>({
  method: 'POST',
  name: 'Sign In Methods For E-Mail',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
});

export const postSignIn = createActionGroup<
  fromModels.PostSignInArgs,
  FirebaseUser
>({
  method: 'POST',
  name: 'Sign In',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
});

export const AUTH_ACTIONS = [postSignInMethodsForEmail, postSignIn] as const;
