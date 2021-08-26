import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';
import {
  UpdateActivatedEventWithData,
  UpdateAvailableEventWithData,
} from '@setgo/types';

@Injectable({
  providedIn: 'root',
})
export class ServiceWorkerService {
  updateAvailable$: Observable<UpdateAvailableEventWithData>;
  updateActivated$: Observable<UpdateActivatedEventWithData>;

  constructor(private _swUpdate: SwUpdate) {
    this.updateAvailable$ = this._swUpdate
      .available as Observable<UpdateAvailableEventWithData>;
    this.updateActivated$ = this._swUpdate
      .activated as Observable<UpdateActivatedEventWithData>;
  }

  activateUpdate() {
    return from(this._swUpdate.activateUpdate());
  }

  checkForUpdate() {
    return from(this._swUpdate.checkForUpdate());
  }
}
