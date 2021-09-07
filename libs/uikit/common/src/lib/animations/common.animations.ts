import {
  animateChild,
  group,
  query,
  transition,
  trigger,
} from '@angular/animations';

export const awaitInner = trigger('awaitInner', [
  transition(':leave', [
    group([query('@*', animateChild(), { optional: true })]),
  ]),
]);
