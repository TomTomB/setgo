import { CardComponent } from './card/card.component';
import { SpinnerComponent } from './spinner/spinner.component';

export * from './card/card.component';
export * from './spinner/spinner.component';

export const COMPONENTS = [CardComponent, SpinnerComponent] as const;
