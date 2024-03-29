import { Environment } from '@setgo/types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import versionFile from '../../../../git-version.json';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: Environment = {
  production: false,
  version: versionFile,
  useEmulators: true,
  recaptcha: '6LeVNkQbAAAAAELZo6mWYyzWElm6ZodXbkjz5g_t',
  firebase: {
    apiKey: 'AIzaSyCxYbpq9pBPeVJHYnUEdrQBFrHjEo6sNlk',
    authDomain: 'setgo-app.firebaseapp.com',
    databaseURL:
      'https://setgo-app-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'setgo-app',
    storageBucket: 'setgo-app.appspot.com',
    messagingSenderId: '546826304751',
    appId: '1:546826304751:web:410b9b0087d51a21beaf1a',
    measurementId: 'G-1ZT07P58PR',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
