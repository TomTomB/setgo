import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { NgrxUniversalRehydrateModule } from '@trellisorg/ngrx-universal-rehydrate';
import { StoreAuthModule } from '@setgo/store/auth';
import { StoreModule } from '@ngrx/store';
import { StoreRouterModule } from '@setgo/store/router';
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
          strictActionWithinNgZone: true,
          strictStateSerializability: true,
        },
      },
    ),
    EffectsModule.forRoot([]),
    StoreAuthModule,
    StoreRouterModule,
    NgrxUniversalRehydrateModule.forRoot({}),
  ],
  providers: [TransferState],
})
export class NgRxModule {}
