import * as Actions from './service-worker.actions';
import * as Selectors from './service-worker.selectors';
import * as fromReducer from './service-worker.reducer';
import { Action, Store } from '@ngrx/store';
import { ApplicationRef, Injectable, NgZone } from '@angular/core';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServiceWorkerFacade {
  activatedUpdate$ = this._store.select(
    Selectors.getServiceWorkerActivatedUpdate,
  );
  availableUpdate$ = this._store.select(
    Selectors.getServiceWorkerAvailableUpdate,
  );
  hasActivatedUpdate$ = this._store.select(
    Selectors.getServiceWorkerHasActivatedUpdate,
  );
  hasAvailableUpdate$ = this._store.select(
    Selectors.getServiceWorkerHasAvailableUpdate,
  );

  constructor(
    private _appRef: ApplicationRef,
    private _store: Store<fromReducer.ServiceWorkerPartialState>,
    private _zone: NgZone,
  ) {}

  startPolling() {
    const appIsStable$ = this._appRef.isStable.pipe(
      first((isStable) => isStable === true),
    );
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(() =>
      this._zone.run(this.dispatchCheckForUpdate, this),
    );
  }

  dispatchActivateUpdate() {
    this._dispatch(Actions.activateUpdate());
  }

  dispatchCheckForUpdate() {
    this._dispatch(Actions.checkForUpdate());
  }

  private _dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
