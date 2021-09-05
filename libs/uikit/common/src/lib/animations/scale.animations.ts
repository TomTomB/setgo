import { animate, style, transition, trigger } from '@angular/animations';

export const scaleOvershoot = trigger('scaleOvershoot', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'scale(0)',
    }),
    animate(
      '200ms cubic-bezier(0.4, 0, 0.2, 1.5)',
      style({
        opacity: 1,
        transform: 'scale(1)',
      }),
    ),
  ]),
  transition(':leave', [
    animate(
      '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({
        opacity: 0,
        transform: 'scale(0)',
      }),
    ),
  ]),
]);
