import 'firebase/app-check';
import {
  APP_NAME,
  APP_VERSION,
  AngularFireAnalyticsModule,
  COLLECTION_ENABLED,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import {
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/auth';
import {
  AngularFireDatabaseModule,
  USE_EMULATOR as USE_DATABASE_EMULATOR,
} from '@angular/fire/database';
import {
  AngularFireFunctionsModule,
  REGION,
  USE_EMULATOR as USE_FUNCTIONS_EMULATOR,
} from '@angular/fire/functions';
import { AngularFireModule } from '@angular/fire';
import { AngularFirePerformanceModule } from '@angular/fire/performance';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {
  AngularFirestoreModule,
  USE_EMULATOR as USE_FIRESTORE_EMULATOR,
} from '@angular/fire/firestore';
import { NgModule } from '@angular/core';
import { environment } from '@setgo/env';

// TODO(TRB): This is currently not supported by angular fire
// See: https://github.com/angular/angularfire/issues/2858
// if (environment.production) {
//   const appCheck = firebase.appCheck();
//   appCheck.activate(environment.recaptcha);
// }

// TODO(TRB): Use storage emulator once available
// See: https://github.com/angular/angularfire/pull/2805

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase, 'set-go-platform'),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    environment.production
      ? [AngularFirePerformanceModule, AngularFireAnalyticsModule]
      : [],
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    {
      provide: COLLECTION_ENABLED,
      useValue: false,
    },
    {
      provide: APP_VERSION,
      useValue: environment.version.semverString,
    },
    {
      provide: APP_NAME,
      useValue: 'SET.GO. PWA',
    },
    { provide: REGION, useValue: 'europe-west1' },
    {
      provide: USE_AUTH_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 9099] : undefined,
    },
    {
      provide: USE_DATABASE_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 9000] : undefined,
    },
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 8080] : undefined,
    },
    {
      provide: USE_FUNCTIONS_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 5001] : undefined,
    },
  ],
})
export class FirebaseModule {}
