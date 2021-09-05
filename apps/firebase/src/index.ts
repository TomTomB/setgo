import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

admin.firestore().settings({
  ignoreUndefinedProperties: true,
});

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true});
  response.send('Hello from Firebase men!');
});
