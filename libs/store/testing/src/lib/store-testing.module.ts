import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreAuthModule } from '@setgo/store/auth';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { StoreRouterModule } from '@setgo/store/router';
import { environment } from '@setgo/env';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions } from 'firebase/functions';
import { getPerformance } from 'firebase/performance';
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { provideAnalytics } from '@angular/fire/analytics';
import { provideAuth } from '@angular/fire/auth';
import { provideDatabase } from '@angular/fire/database';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFunctions } from '@angular/fire/functions';
import { providePerformance } from '@angular/fire/performance';
import { provideStorage } from '@angular/fire/storage';

@NgModule({
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFunctions(() => {
      const functions = getFunctions();
      functions.region = 'europe-west1';
      return functions;
    }),
    provideAnalytics(() => {
      const analytics = getAnalytics();
      analytics.app.automaticDataCollectionEnabled = environment.production;
      return analytics;
    }),
    providePerformance(() => {
      const performance = getPerformance();
      performance.dataCollectionEnabled = environment.production;
      performance.instrumentationEnabled = environment.production;
      return performance;
    }),
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
