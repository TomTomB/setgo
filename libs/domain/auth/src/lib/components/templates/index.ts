import { AuthHostTemplateComponent } from './auth-host/auth-host.component';
import { IdentifierTemplateComponent } from './identifier/identifier.component';

export * from './auth-host/auth-host.component';
export * from './identifier/identifier.component';

export const COMPONENTS = [
  AuthHostTemplateComponent,
  IdentifierTemplateComponent,
] as const;
