import {NgModule} from '@angular/core';
import {provideAnalytics} from '@angular/fire/analytics';
import {provideFirebaseApp} from '@angular/fire/app';
import {provideAuth} from '@angular/fire/auth';
import {provideDatabase} from '@angular/fire/database';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {provideFunctions} from '@angular/fire/functions';
import {providePerformance} from '@angular/fire/performance';
import {provideStorage} from '@angular/fire/storage';
import {environment} from '@setgo/env';
import {getAnalytics} from 'firebase/analytics';
import {initializeApp} from 'firebase/app';
import {initializeAppCheck, ReCaptchaV3Provider} from 'firebase/app-check';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import {enableIndexedDbPersistence} from 'firebase/firestore';
import {getFunctions} from 'firebase/functions';
import {getPerformance} from 'firebase/performance';
import {getStorage} from 'firebase/storage';

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
export class FirebaseModule {
}
