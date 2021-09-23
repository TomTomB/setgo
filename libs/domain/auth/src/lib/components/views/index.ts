import { AuthHostViewComponent } from './auth-host/auth-host.component';
import { IdentifierViewComponent } from './identifier/identifier.component';

export * from './auth-host/auth-host.component';
export * from './identifier/identifier.component';

export const COMPONENTS = [
  AuthHostViewComponent,
  IdentifierViewComponent,
] as const;
