import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TransferState} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreAuthModule} from '@setgo/store/auth';
import {StoreRouterModule} from '@setgo/store/router';
import {StoreServiceWorkerModule} from '@setgo/store/service-worker';
import {StoreUiShellModule} from '@setgo/store/ui/shell';
import {NgrxUniversalRehydrateModule} from '@trellisorg/ngrx-universal-rehydrate';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(
        {},
        {
          metaReducers: [],
          runtimeChecks: {
            strictActionImmutability: true,
            strictStateImmutability: true,
            strictActionSerializability: true,
            strictActionTypeUniqueness: true,
            strictStateSerializability: true,
            strictActionWithinNgZone: true,
          },
        },
        ),
    EffectsModule.forRoot([]),
    NgrxUniversalRehydrateModule.forRoot({}),
    StoreAuthModule,
    StoreRouterModule,
    StoreServiceWorkerModule,
    StoreUiShellModule,
  ],
  providers: [TransferState],
})
export class NgRxModule {
}
