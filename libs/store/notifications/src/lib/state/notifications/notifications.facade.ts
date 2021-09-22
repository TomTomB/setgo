import * as Actions from './notifications.actions';
import * as Models from './notifications.models';
import * as Selectors from './notifications.selectors';
import * as fromReducer from './notifications.reducer';
import { Actions as ActionsNative } from '@ngrx/effects';
import { FacadeBase } from '@tomtomb/ngrx-toolkit';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class NotificationsFacade extends FacadeBase {
  notifications$ = this.store.select(Selectors.getNotifications);

  constructor(
    private store: Store<fromReducer.NotificationsPartialState>,
    private actions: ActionsNative,
  ) {
    super(store, actions, Selectors.entitySelectors);
  }

  getFoo(args: Models.GetFooArgs) {
    return this.call(Actions.getFoo, args);
  }

  addNotificationMessage(args: Models.AddNotificationMessageArgs) {
    return this.store.dispatch(Actions.addNotificationMessage(args));
  }

  removeNotificationMessage(args: Models.RemoveNotificationMessageArgs) {
    return this.store.dispatch(Actions.removeNotificationMessage(args));
  }

  removeNotificationGroup(args: Models.RemoveNotificationGroupArgs) {
    return this.store.dispatch(Actions.removeNotificationGroup(args));
  }

  removeAllNotifications() {
    return this.store.dispatch(Actions.removeAllNotifications());
  }
}
