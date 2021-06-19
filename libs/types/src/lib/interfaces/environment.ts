import { FirebaseConfig } from './firebase';
import { Version } from './version';

export interface Environment {
  production: boolean;
  version: Version;
  recaptcha: string;
  firebase: FirebaseConfig;
  useEmulators: boolean;
}
