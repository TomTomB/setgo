import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {UiShellEffects} from './state/shell/shell.effects';
import * as fromReducer from './state/shell/shell.reducer';

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
export class StoreUiShellModule {
}
