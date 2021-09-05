import {animate, style, transition, trigger} from '@angular/animations';

export const growShrink = trigger('growShrink', [
  transition(
      ':enter',
      [
        style({
          opacity: 0,
          height: '0px',
          transform: 'scaleY(0)',
        }),
        animate(
            '150ms cubic-bezier(0.4, 0, 0.2, 1)',
            style({
              opacity: 1,
              height: '*',
              transform: 'scaleY(1)',
            }),
            ),
      ]),
  transition(
      ':leave',
      [
        animate(
            '150ms cubic-bezier(0.4, 0, 0.2, 1)',
            style({
              opacity: 0,
              height: '0px',
              transform: 'scaleY(0)',
            }),
            ),
      ]),
]);

export const shrink = trigger('shrink', [
  transition(
      ':enter',
      [
        style({
          opacity: 0,
          height: '0px',
        }),
        animate(
            '150ms cubic-bezier(0.4, 0, 0.2, 1)',
            style({
              opacity: 1,
              height: '*',
            }),
            ),
      ]),
  transition(
      ':leave',
      [
        animate(
            '150ms cubic-bezier(0.4, 0, 0.2, 1)',
            style({
              opacity: 0,
              height: '0px',
              padding: '0px',
            }),
            ),
      ]),
]);
