import * as Actions from './service-worker.actions';
import { Action, createReducer, on } from '@ngrx/store';
import {
  UpdateActivatedEventWithData,
  UpdateAvailableEventWithData,
} from '@setgo/types';

export const SERVICE_WORKER_FEATURE_KEY = 'serviceWorker';

export interface State {
  activatedUpdate: UpdateActivatedEventWithData | null;
  availableUpdate: UpdateAvailableEventWithData | null;
}

export interface ServiceWorkerPartialState {
  readonly [SERVICE_WORKER_FEATURE_KEY]: State;
}

export const initialState: State = {
  activatedUpdate: null,
  availableUpdate: null,
};

const serviceWorkerReducer = createReducer(
  initialState,
  on(Actions.updateAvailable, (state, { update }) => ({
    ...state,
    availableUpdate: update,
  })),
  on(Actions.noUpdateAvailable, (state) => ({
    ...state,
    availableUpdate: null,
  })),
  on(Actions.updateActivated, (state, { update }) => ({
    ...state,
    activatedUpdate: update,
  })),
  on(Actions.updateNotActivated, (state) => ({
    ...state,
    activatedUpdate: null,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return serviceWorkerReducer(state, action);
}
