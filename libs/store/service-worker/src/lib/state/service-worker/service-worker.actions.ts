import {
  UpdateActivatedEventWithData,
  UpdateAvailableEventWithData,
} from '@setgo/types';
import { createAction, props } from '@ngrx/store';

export const updateActivated = createAction(
  '[Service Worker] Update Activated',
  props<{ update: UpdateActivatedEventWithData }>(),
);
export const updateNotActivated = createAction(
  '[Service Worker] Update Not Activated',
);

export const updateAvailable = createAction(
  '[Service Worker] Update Available',
  props<{ update: UpdateAvailableEventWithData }>(),
);
export const noUpdateAvailable = createAction(
  '[Service Worker] No Update Available',
);

export const activateUpdate = createAction('[Service Worker] Activate Update');
export const checkForUpdate = createAction('[Service Worker] Check For Update');
