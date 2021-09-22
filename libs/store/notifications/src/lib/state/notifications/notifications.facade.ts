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

  addNotification(args: Models.AddNotificationArgs) {
    return this.store.dispatch(Actions.addNotification(args));
  }

  removeNotification(args: Models.RemoveNotificationArgs) {
    return this.store.dispatch(Actions.removeNotification(args));
  }

  removeNotificationGroup(args: Models.RemoveNotificationGroupArgs) {
    return this.store.dispatch(Actions.removeNotificationGroup(args));
  }
}
