import * as fromReducer from './state/service-worker/service-worker.reducer';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { ServiceWorkerEffects } from './state/service-worker/service-worker.effects';
import { StoreModule } from '@ngrx/store';

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
export class StoreServiceWorkerModule {}
