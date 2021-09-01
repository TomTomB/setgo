import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { NgrxUniversalRehydrateModule } from '@trellisorg/ngrx-universal-rehydrate';
import { StoreAuthModule } from '@setgo/store/auth';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { StoreRouterModule } from '@setgo/store/router';
import { StoreServiceWorkerModule } from '@setgo/store/service-worker';
import { StoreUiShellModule } from '@setgo/store/ui/shell';
import { TransferState } from '@angular/platform-browser';

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
    StoreDevtoolsModule.instrument(),
    NgrxUniversalRehydrateModule.forRoot({}),
    StoreAuthModule,
    StoreRouterModule,
    StoreServiceWorkerModule,
    StoreUiShellModule,
  ],
  providers: [TransferState],
})
export class NgRxModule {}
