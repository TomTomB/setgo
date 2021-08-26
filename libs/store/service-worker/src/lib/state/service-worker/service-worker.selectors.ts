import * as fromReducer from './service-worker.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getServiceWorkerState = createFeatureSelector<
  fromReducer.ServiceWorkerPartialState,
  fromReducer.State
>(fromReducer.SERVICE_WORKER_FEATURE_KEY);

export const getServiceWorkerHasAvailableUpdate = createSelector(
  getServiceWorkerState,
  (state: fromReducer.State) => !!state.availableUpdate,
);
export const getServiceWorkerHasActivatedUpdate = createSelector(
  getServiceWorkerState,
  (state: fromReducer.State) => !!state.activatedUpdate,
);

export const getServiceWorkerAvailableUpdate = createSelector(
  getServiceWorkerState,
  (state: fromReducer.State) => state.availableUpdate,
);
export const getServiceWorkerActivatedUpdate = createSelector(
  getServiceWorkerState,
  (state: fromReducer.State) => state.activatedUpdate,
);
