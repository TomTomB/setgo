import * as Actions from './shell.actions';
import * as Selectors from './shell.selectors';
import * as fromReducer from './shell.reducer';
import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { UiTriggerAction } from '@setgo/types';

@Injectable({ providedIn: 'root' })
export class UiShellFacade {
  notificationShadeVisibility$ = this.store.select(
    Selectors.getNotificationShadeVisibility,
  );

  constructor(private store: Store<fromReducer.UiShellPartialState>) {}

  dispatchSetNotificationShadeVisibility(uiAction: UiTriggerAction) {
    this._dispatch(Actions.setNotificationShadeVisibility({ uiAction }));
  }

  private _dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
