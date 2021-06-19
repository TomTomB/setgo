import { Environment } from '@setgo/types';
import versionFile from '../../../../../git-version.json';

export const environment: Environment = {
  production: true,
  version: versionFile,
  useEmulators: false,
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
