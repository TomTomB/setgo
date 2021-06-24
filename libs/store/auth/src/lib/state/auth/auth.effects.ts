import * as Actions from './auth.actions';
import { Actions as ActionsNative } from '@ngrx/effects';
import { AuthService } from './auth.service';
import { EffectBase } from '@tomtomb/ngrx-toolkit';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthEffects extends EffectBase {
  createUserWithEmailAndPassword$ = this.onActionSwitchMap({
    action: Actions.createUserWithEmailAndPassword,
    serviceCall: this._featureService.createUserWithEmailAndPassword,
  });

  deleteUser$ = this.onActionSwitchMap({
    action: Actions.deleteUser,
    serviceCall: this._featureService.deleteUser,
  });

  fetchSignInMethodsForEmail$ = this.onActionSwitchMap({
    action: Actions.fetchSignInMethodsForEmail,
    serviceCall: this._featureService.fetchSignInMethodsForEmail,
  });

  getUserIdToken$ = this.onActionSwitchMap({
    action: Actions.getUserIdToken,
    serviceCall: this._featureService.getUserIdToken,
  });

  reloadUser$ = this.onActionSwitchMap({
    action: Actions.reloadUser,
    serviceCall: this._featureService.reloadUser,
  });

  sendPasswordResetEmail$ = this.onActionSwitchMap({
    action: Actions.sendPasswordResetEmail,
    serviceCall: this._featureService.sendPasswordResetEmail,
  });

  sendUserEmailVerification$ = this.onActionSwitchMap({
    action: Actions.sendUserEmailVerification,
    serviceCall: this._featureService.sendUserEmailVerification,
  });

  signInWithEmailAndPassword$ = this.onActionSwitchMap({
    action: Actions.signInWithEmailAndPassword,
    serviceCall: this._featureService.signInWithEmailAndPassword,
  });

  signOut$ = this.onActionSwitchMap({
    action: Actions.signOut,
    serviceCall: this._featureService.signOut,
  });

  updateUserEmail$ = this.onActionSwitchMap({
    action: Actions.updateUserEmail,
    serviceCall: this._featureService.updateUserEmail,
  });

  updateUserPassword$ = this.onActionSwitchMap({
    action: Actions.updateUserPassword,
    serviceCall: this._featureService.updateUserPassword,
  });

  constructor(
    private _actions$: ActionsNative,
    private _featureService: AuthService,
  ) {
    super(_actions$, _featureService);
  }
}
