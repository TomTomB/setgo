import { animate, style, transition, trigger } from '@angular/animations';

export const animateFloatingNotification = trigger(
  'animateFloatingNotification',
  [
    transition('void => slide', [
      style({
        opacity: 0,
        transform: 'translateY(-100%)',
      }),
      animate(
        '200ms cubic-bezier(0.4, 0, 0.2, 1)',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        }),
      ),
    ]),
    transition('slide => void', [
      animate(
        '150ms cubic-bezier(0.4, 0, 0.2, 1)',
        style({
          opacity: 0,
          height: 0,
          transform: 'scale(0)',
          margin: 0,
        }),
      ),
    ]),
  ],
);
