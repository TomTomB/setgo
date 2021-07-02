import { animate, style, transition, trigger } from '@angular/animations';

export const growShrink = trigger('growShrink', [
  transition(':enter', [
    style({
      opacity: 0,
      height: '0px',
      transform: 'translateY(-20px)',
    }),
    animate(
      '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({
        opacity: 1,
        height: '*',
        transform: 'translateY(0)',
      }),
    ),
  ]),
  transition(':leave', [
    animate(
      '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({
        opacity: 0,
        height: '0px',
        transform: 'translateY(-20px)',
      }),
    ),
  ]),
]);
