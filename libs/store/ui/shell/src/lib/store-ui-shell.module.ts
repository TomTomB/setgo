import * as fromReducer from './state/shell/shell.reducer';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { UiShellEffects } from './state/shell/shell.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromReducer.UI_SHELL_FEATURE_KEY,
      fromReducer.reducer,
    ),
    EffectsModule.forFeature([UiShellEffects]),
  ],
})
export class StoreUiShellModule {}
