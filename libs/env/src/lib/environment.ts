import { Environment } from '@setgo/types';

export const environment: Environment = {
  production: false,
  useEmulators: true,
  recaptcha: 'dummy',
  version: {
    dirty: false,
    distance: 0,
    hash: 'dummy',
    raw: 'dummy',
    semver: {
      build: [],
      loose: false,
      major: 1,
      minor: 0,
      options: {
        includePrerelease: false,
        loose: false,
      },
      patch: 0,
      prerelease: [],
      raw: 'dummy',
      version: 'dummy',
    },
    semverString: 'dummy',
    suffix: 'dummy',
    tag: 'dummy',
  },
  firebase: {
    apiKey: 'dummy',
    appId: 'dummy',
    authDomain: 'dummy',
    databaseURL: 'dummy',
    measurementId: 'dummy',
    messagingSenderId: 'dummy',
    projectId: 'dummy',
    storageBucket: 'dummy',
  },
};
