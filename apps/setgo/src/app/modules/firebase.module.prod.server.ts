import { NgModule } from '@angular/core';
import { environment } from '@setgo/env';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions } from 'firebase/functions';
import { getPerformance } from 'firebase/performance';
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
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
    providePerformance(() => getPerformance()),
  ],
})
export class FirebaseModule {}
