import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {AuthEffects} from './state/auth/auth.effects';
import * as fromReducer from './state/auth/auth.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromReducer.AUTH_FEATURE_KEY, fromReducer.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class StoreAuthModule {
}
