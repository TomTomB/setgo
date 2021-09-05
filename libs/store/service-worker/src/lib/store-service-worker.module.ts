import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {ServiceWorkerEffects} from './state/service-worker/service-worker.effects';
import * as fromReducer from './state/service-worker/service-worker.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
        fromReducer.SERVICE_WORKER_FEATURE_KEY,
        fromReducer.reducer,
        ),
    EffectsModule.forFeature([ServiceWorkerEffects]),
  ],
})
export class StoreServiceWorkerModule {
}
