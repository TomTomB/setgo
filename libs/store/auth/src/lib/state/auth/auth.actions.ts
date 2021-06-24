import * as Models from './auth.models';
import { FirebaseUser } from '@setgo/types';
import { createActionGroup } from '@tomtomb/ngrx-toolkit';

export const AUTH_ACTION_PREFIX = 'Auth';

export const fetchSignInMethodsForEmail = createActionGroup<
  Models.FetchSignInMethodsForEmailArgs,
  string[]
>({
  method: 'POST',
  name: 'Fetch Sign In Methods For E-Mail',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
});

export const signInWithEmailAndPassword = createActionGroup<
  Models.SignInWithEmailAndPasswordArgs,
  FirebaseUser
>({
  method: 'POST',
  name: 'Sign In With E-Mail And Password',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
});

export const signOut = createActionGroup<null, null>({
  method: 'POST',
  name: 'Sign In With E-Mail And Password',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
});

export const createUserWithEmailAndPassword = createActionGroup<
  Models.CreateUserWithEmailAndPasswordArgs,
  FirebaseUser
>({
  method: 'POST',
  name: 'Create User With E-Mail And Password',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
});

export const sendPasswordResetEmail = createActionGroup<
  Models.SendPasswordResetEmailArgs,
  null
>({
  method: 'POST',
  name: 'Send Password Reset E-Mail',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
});

export const deleteUser = createActionGroup<null, null>({
  method: 'POST',
  name: 'Delete User',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
});

export const getUserIdToken = createActionGroup<
  Models.GetUserIdTokenArgs,
  string
>({
  method: 'GET',
  name: 'User ID Token',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
});

export const reloadUser = createActionGroup<null, FirebaseUser>({
  method: 'POST',
  name: 'Reload User',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
});

export const sendUserEmailVerification = createActionGroup<null, null>({
  method: 'POST',
  name: 'Send User E-Mail Verification',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
});

export const updateUserEmail = createActionGroup<
  Models.UpdateUserEmailArgs,
  null
>({
  method: 'POST',
  name: 'Update User E-Mail',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
});

export const updateUserPassword = createActionGroup<
  Models.UpdateUserPasswordArgs,
  null
>({
  method: 'POST',
  name: 'Update User Password',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
});

export const AUTH_ACTIONS = [
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  deleteUser,
  getUserIdToken,
  reloadUser,
  sendUserEmailVerification,
  updateUserEmail,
  updateUserPassword,
] as const;
