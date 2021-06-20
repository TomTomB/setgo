import * as AuthActions from './auth.actions';
import { Actions } from '@ngrx/effects';
import { AuthService } from './auth.service';
import { EffectBase } from '@tomtomb/ngrx-toolkit';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthEffects extends EffectBase {
  postSignIn$ = this.onActionSwitchMap({
    action: AuthActions.postSignIn,
    serviceCall: this._featureService.postSignIn,
  });
  postSignInMethodsForEmail$ = this.onActionSwitchMap({
    action: AuthActions.postSignInMethodsForEmail,
    serviceCall: this._featureService.postSignInMethodsForEmail,
  });

  constructor(
    private _actions$: Actions,
    private _featureService: AuthService,
  ) {
    super(_actions$, _featureService);
  }
}
