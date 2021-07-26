import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { NgrxUniversalRehydrateModule } from '@trellisorg/ngrx-universal-rehydrate';
import { StoreAuthModule } from '@setgo/store/auth';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { StoreRouterModule } from '@setgo/store/router';
import { TransferState } from '@angular/platform-browser';
import { environment } from '@setgo/env';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: !environment.production
          ? {
              strictActionImmutability: true,
              strictStateImmutability: true,
              strictActionSerializability: true,
              strictActionTypeUniqueness: true,
              strictActionWithinNgZone: true,
              strictStateSerializability: true,
            }
          : undefined,
      },
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreAuthModule,
    StoreRouterModule,
    NgrxUniversalRehydrateModule.forRoot({}),
  ],
  providers: [TransferState],
})
export class NgRxModule {}
