import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {UiTriggerAction} from '@setgo/types';

import * as Actions from './shell.actions';
import * as fromReducer from './shell.reducer';
import * as Selectors from './shell.selectors';

@Injectable({providedIn: 'root'})
export class UiShellFacade {
  notificationShadeVisibility$ = this.store.select(
      Selectors.getNotificationShadeVisibility,
  );

  constructor(private store: Store<fromReducer.UiShellPartialState>) {}

  dispatchSetNotificationShadeVisibility(uiAction: UiTriggerAction) {
    this._dispatch(Actions.setNotificationShadeVisibility({uiAction}));
  }

  private _dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
