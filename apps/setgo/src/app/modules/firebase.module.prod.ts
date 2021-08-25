import { NgModule } from '@angular/core';
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check';
import { enableIndexedDbPersistence } from 'firebase/firestore';
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
    provideFirebaseApp(() => {
      const app = initializeApp(environment.firebase);

      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(environment.recaptcha),
      });

      return app;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      enableIndexedDbPersistence(firestore);
      return firestore;
    }),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFunctions(() => {
      const functions = getFunctions();
      functions.region = 'europe-west1';
      return functions;
    }),
    provideAnalytics(() => getAnalytics()),
    providePerformance(() => getPerformance()),
  ],
})
export class FirebaseModule {}
