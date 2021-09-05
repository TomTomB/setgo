import * as Models from './auth.models';
import { FirebaseUser } from '@setgo/types';
import { createActionGroup, defineArgTypes } from '@tomtomb/ngrx-toolkit';

export const AUTH_ACTION_PREFIX = 'Auth';

export const fetchSignInMethodsForEmail = createActionGroup({
  name: 'Fetch Sign In Methods For E-Mail',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
  argsTypes: defineArgTypes<{
    args: Models.FetchSignInMethodsForEmailArgs;
    response: string[];
  }>(),
});

export const signInWithEmailAndPassword = createActionGroup({
  name: 'Sign In With E-Mail And Password',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
  argsTypes: defineArgTypes<{
    args: Models.SignInWithEmailAndPasswordArgs;
    response: FirebaseUser;
  }>(),
});

export const signOut = createActionGroup({
  name: 'Sign Out',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
  argsTypes: defineArgTypes<{
    args: null;
    response: null;
  }>(),
});

export const createUserWithEmailAndPassword = createActionGroup({
  name: 'Create User With E-Mail And Password',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
  argsTypes: defineArgTypes<{
    args: Models.CreateUserWithEmailAndPasswordArgs;
    response: FirebaseUser;
  }>(),
});

export const sendPasswordResetEmail = createActionGroup({
  name: 'Send Password Reset E-Mail',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
  argsTypes: defineArgTypes<{
    args: Models.SendPasswordResetEmailArgs;
    response: null;
  }>(),
});

export const deleteUser = createActionGroup({
  name: 'Delete User',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
  argsTypes: defineArgTypes<{
    args: null;
    response: null;
  }>(),
});

export const getUserIdToken = createActionGroup({
  name: 'User ID Token',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
  argsTypes: defineArgTypes<{
    args: Models.GetUserIdTokenArgs;
    response: string;
  }>(),
});

export const reloadUser = createActionGroup({
  name: 'Reload User',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
  argsTypes: defineArgTypes<{
    args: null;
    response: FirebaseUser;
  }>(),
});

export const sendUserEmailVerification = createActionGroup({
  name: 'Send User E-Mail Verification',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
  argsTypes: defineArgTypes<{
    args: null;
    response: null;
  }>(),
});

export const updateUserEmail = createActionGroup({
  name: 'Update User E-Mail',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
  argsTypes: defineArgTypes<{
    args: Models.UpdateUserEmailArgs;
    response: null;
  }>(),
});

export const updateUserPassword = createActionGroup({
  name: 'Update User Password',
  scope: AUTH_ACTION_PREFIX,
  isUnique: true,
  argsTypes: defineArgTypes<{
    args: Models.UpdateUserPasswordArgs;
    response: null;
  }>(),
});

export const AUTH_ACTIONS = {
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
};
