import * as Inputs from './inputs';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { LabelComponent } from './label/label.component';

export * from './label/label.component';
export * from './error-message/error-message.component';
export * from './inputs';

export const COMPONENTS = [
  LabelComponent,
  ErrorMessageComponent,
  Inputs.TextInputComponent,
] as const;
