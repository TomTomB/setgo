import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {EffectBase} from '@tomtomb/ngrx-toolkit';

import * as FeatureActions from './auth.actions';
import {AuthService} from './auth.service';

@Injectable()
export class AuthEffects extends EffectBase {
  createUserWithEmailAndPassword$ = this.onActionSwitchMap({
    action: FeatureActions.createUserWithEmailAndPassword,
    serviceCall: this._featureService.createUserWithEmailAndPassword,
  });

  deleteUser$ = this.onActionSwitchMap({
    action: FeatureActions.deleteUser,
    serviceCall: this._featureService.deleteUser,
  });

  fetchSignInMethodsForEmail$ = this.onActionSwitchMap({
    action: FeatureActions.fetchSignInMethodsForEmail,
    serviceCall: this._featureService.fetchSignInMethodsForEmail,
  });

  getUserIdToken$ = this.onActionSwitchMap({
    action: FeatureActions.getUserIdToken,
    serviceCall: this._featureService.getUserIdToken,
  });

  reloadUser$ = this.onActionSwitchMap({
    action: FeatureActions.reloadUser,
    serviceCall: this._featureService.reloadUser,
  });

  sendPasswordResetEmail$ = this.onActionSwitchMap({
    action: FeatureActions.sendPasswordResetEmail,
    serviceCall: this._featureService.sendPasswordResetEmail,
  });

  sendUserEmailVerification$ = this.onActionSwitchMap({
    action: FeatureActions.sendUserEmailVerification,
    serviceCall: this._featureService.sendUserEmailVerification,
  });

  signInWithEmailAndPassword$ = this.onActionSwitchMap({
    action: FeatureActions.signInWithEmailAndPassword,
    serviceCall: this._featureService.signInWithEmailAndPassword,
  });

  signOut$ = this.onActionSwitchMap({
    action: FeatureActions.signOut,
    serviceCall: this._featureService.signOut,
  });

  updateUserEmail$ = this.onActionSwitchMap({
    action: FeatureActions.updateUserEmail,
    serviceCall: this._featureService.updateUserEmail,
  });

  updateUserPassword$ = this.onActionSwitchMap({
    action: FeatureActions.updateUserPassword,
    serviceCall: this._featureService.updateUserPassword,
  });

  constructor(
      private _actions$: Actions,
      private _featureService: AuthService,
  ) {
    super(_actions$, _featureService);
  }
}
