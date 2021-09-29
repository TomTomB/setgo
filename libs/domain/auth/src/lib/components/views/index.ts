import { AuthHostComponent } from './auth-host/auth-host.component';
import { ChallengePasswordComponent } from './challenge/password/password.component';
import { IdentifierComponent } from './identifier/identifier.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export * from './auth-host/auth-host.component';
export * from './identifier/identifier.component';
export * from './register/register.component';
export * from './challenge/password/password.component';
export * from './reset-password/reset-password.component';

export const COMPONENTS = [
  AuthHostComponent,
  IdentifierComponent,
  RegisterComponent,
  ChallengePasswordComponent,
  ResetPasswordComponent,
] as const;
