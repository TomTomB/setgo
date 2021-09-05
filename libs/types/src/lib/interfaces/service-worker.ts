import {UpdateActivatedEvent, UpdateAvailableEvent,} from '@angular/service-worker';
import {Version} from './version';

export interface UpdateAvailableEventWithData extends UpdateAvailableEvent {
  available: {hash: string; appData: {update: {notes: string; version: Version;};};};
}

export interface UpdateActivatedEventWithData extends UpdateActivatedEvent {
  available: {hash: string; appData: {update: {notes: string; version: Version;};};};
}
