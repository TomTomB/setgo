import * as Actions from './service-worker.actions';
import * as Selectors from './service-worker.selectors';
import * as fromReducer from './service-worker.reducer';
import { Action, Store } from '@ngrx/store';
import { ApplicationRef, Injectable } from '@angular/core';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServiceWorkerFacade {
  activatedUpdate$ = this.store.select(
    Selectors.getServiceWorkerActivatedUpdate,
  );
  availableUpdate$ = this.store.select(
    Selectors.getServiceWorkerAvailableUpdate,
  );
  hasActivatedUpdate$ = this.store.select(
    Selectors.getServiceWorkerHasActivatedUpdate,
  );
  hasAvailableUpdate$ = this.store.select(
    Selectors.getServiceWorkerHasAvailableUpdate,
  );

  constructor(
    private appRef: ApplicationRef,
    private store: Store<fromReducer.ServiceWorkerPartialState>,
  ) {}

  startPolling() {
    const appIsStable$ = this.appRef.isStable.pipe(
      first((isStable) => isStable === true),
    );
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(() =>
      this.dispatchCheckForUpdate(),
    );
  }

  dispatchActivateUpdate() {
    this._dispatch(Actions.activateUpdate());
  }

  dispatchCheckForUpdate() {
    this._dispatch(Actions.checkForUpdate());
  }

  private _dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
