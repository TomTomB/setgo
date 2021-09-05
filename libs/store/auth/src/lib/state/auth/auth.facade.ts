import * as Actions from './auth.actions';
import * as Models from './auth.models';
import * as Selectors from './auth.selectors';
import * as fromReducer from './auth.reducer';
import { Actions as ActionsNative } from '@ngrx/effects';
import { FacadeBase } from '@tomtomb/ngrx-toolkit';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade extends FacadeBase {
  constructor(
    private store: Store<fromReducer.AuthPartialState>,
    private actions: ActionsNative,
  ) {
    super(store, actions, Selectors.entitySelectors);
  }

  fetchSignInMethodsForEmail(args: Models.FetchSignInMethodsForEmailArgs) {
    return this.call(Actions.fetchSignInMethodsForEmail, args);
  }

  signInWithEmailAndPassword(args: Models.SignInWithEmailAndPasswordArgs) {
    return this.call(Actions.signInWithEmailAndPassword, args);
  }

  signOut() {
    return this.call(Actions.signOut, null);
  }

  createUserWithEmailAndPassword(
    args: Models.CreateUserWithEmailAndPasswordArgs,
  ) {
    return this.call(Actions.createUserWithEmailAndPassword, args);
  }

  sendPasswordResetEmail(args: Models.SendPasswordResetEmailArgs) {
    return this.call(Actions.sendPasswordResetEmail, args);
  }

  deleteUser() {
    return this.call(Actions.deleteUser, null);
  }

  getUserIdToken(args: Models.GetUserIdTokenArgs) {
    return this.call(Actions.getUserIdToken, args);
  }

  reloadUser() {
    return this.call(Actions.reloadUser, null);
  }

  sendUserEmailVerification() {
    return this.call(Actions.sendUserEmailVerification, null);
  }

  updateUserEmail(args: Models.UpdateUserEmailArgs) {
    return this.call(Actions.updateUserEmail, args);
  }

  updateUserPassword(args: Models.UpdateUserPasswordArgs) {
    return this.call(Actions.updateUserPassword, args);
  }
}
