import * as fromReducer from './state/auth/auth.reducer';
import { AuthEffects } from './state/auth/auth.effects';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromReducer.AUTH_FEATURE_KEY, fromReducer.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class StoreAuthModule {}
