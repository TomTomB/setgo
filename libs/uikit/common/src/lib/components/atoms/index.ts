import { CardComponent } from './card/card.component';
import { LinkPrimaryComponent } from './link-primary/link-primary.component';
import { LinkSecondaryComponent } from './link-secondary/link-secondary.component';
import { SpinnerComponent } from './spinner/spinner.component';

export * from './card/card.component';
export * from './spinner/spinner.component';
export * from './link-primary/link-primary.component';
export * from './link-secondary/link-secondary.component';

export const COMPONENTS = [
  CardComponent,
  SpinnerComponent,
  LinkPrimaryComponent,
  LinkSecondaryComponent,
] as const;
