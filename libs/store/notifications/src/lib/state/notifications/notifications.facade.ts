import * as Actions from './notifications.actions';
import * as Models from './notifications.models';
import * as Selectors from './notifications.selectors';
import * as fromReducer from './notifications.reducer';
import { Actions as ActionsNative } from '@ngrx/effects';
import { FacadeBase } from '@tomtomb/ngrx-toolkit';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiShellFacade } from '@setgo/store/ui/shell';
import { take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationsFacade extends FacadeBase {
  notifications$ = this._store.select(Selectors.getNotificationGroups);
  floatingNotificationMessages$ = this._store.select(
    Selectors.getFloatingNotificationMessages,
  );

  constructor(
    private _store: Store<fromReducer.NotificationsPartialState>,
    private _actions: ActionsNative,
    private _uiShellFacade: UiShellFacade,
  ) {
    super(_store, _actions, Selectors.entitySelectors);
  }

  getFoo(args: Models.GetFooArgs) {
    return this.call(Actions.getFoo, args);
  }

  addNotificationMessage(args: Models.AddNotificationMessageArgs) {
    if (args.isFloating === undefined) {
      this._uiShellFacade.notificationShadeVisibility$
        .pipe(
          tap((visibility) => {
            if (visibility === 'open') {
              this._store.dispatch(
                Actions.addNotificationMessage({ ...args, isFloating: false }),
              );
            } else {
              this._store.dispatch(
                Actions.addNotificationMessage({ ...args, isFloating: true }),
              );
            }
          }),
          take(1),
        )
        .subscribe();
    } else {
      this._store.dispatch(Actions.addNotificationMessage(args));
    }
  }

  hideNotificationMessage(args: Models.HideNotificationMessageArgs) {
    this._store.dispatch(Actions.hideNotificationMessage(args));
  }

  hideAllNotificationMessages() {
    this._store.dispatch(Actions.hideAllNotificationMessages());
  }

  removeNotificationMessage(args: Models.RemoveNotificationMessageArgs) {
    this._store.dispatch(Actions.removeNotificationMessage(args));
  }

  removeNotificationGroup(args: Models.RemoveNotificationGroupArgs) {
    this._store.dispatch(Actions.removeNotificationGroup(args));
  }

  removeAllNotifications() {
    this._store.dispatch(Actions.removeAllNotifications());
  }
}
