import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreAuthModule } from '@setgo/store/auth';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { StoreRouterModule } from '@setgo/store/router';
import { environment } from '@setgo/env';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireFunctionsModule,
    AngularFireStorageModule,
    CommonModule,
    EffectsModule.forRoot([]),
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
    StoreDevtoolsModule.instrument(),
    StoreAuthModule,
    StoreRouterModule,
  ],
})
export class StoreTestingModule {}
