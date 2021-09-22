import * as fromReducer from './state/notifications/notifications.reducer';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { NotificationsEffects } from './state/notifications/notifications.effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromReducer.NOTIFICATIONS_FEATURE_KEY,
      fromReducer.reducer,
    ),
    EffectsModule.forFeature([NotificationsEffects]),
  ],
})
export class StoreNotificationsModule {}
