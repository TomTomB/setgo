import { ClickOutsideDirective } from './click-outside.directive';
import { RippleDirective } from './ripple';

export * from './click-outside.directive';
export * from './ripple';

export const DIRECTIVES = [ClickOutsideDirective, RippleDirective] as const;
