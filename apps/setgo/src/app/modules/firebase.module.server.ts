import { NgModule } from '@angular/core';
import { connectAuthEmulator, provideAuth } from '@angular/fire/auth';
import {
  connectDatabaseEmulator,
  provideDatabase,
} from '@angular/fire/database';
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import {
  connectFunctionsEmulator,
  provideFunctions,
} from '@angular/fire/functions';
import { connectStorageEmulator, provideStorage } from '@angular/fire/storage';
import { environment } from '@setgo/env';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFunctions } from 'firebase/functions';
import { getPerformance } from 'firebase/performance';
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { providePerformance } from '@angular/fire/performance';

@NgModule({
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const firestore = getFirestore();
      connectFirestoreEmulator(firestore, 'http://localhost', 8080);
      return firestore;
    }),
    provideStorage(() => {
      const storage = getStorage();
      connectStorageEmulator(storage, 'http://localhost', 9199);
      return storage;
    }),
    provideAuth(() => {
      const auth = getAuth();
      connectAuthEmulator(auth, 'http://localhost');
      return auth;
    }),
    provideDatabase(() => {
      const database = getDatabase();
      connectDatabaseEmulator(database, 'http://localhost', 9000);
      return database;
    }),
    provideFunctions(() => {
      const functions = getFunctions();
      functions.region = 'europe-west1';
      connectFunctionsEmulator(functions, 'http://localhost', 5001);
      return functions;
    }),
    providePerformance(() => {
      const performance = getPerformance();
      performance.dataCollectionEnabled = false;
      performance.instrumentationEnabled = false;
      return performance;
    }),
  ],
})
export class FirebaseModule {}
