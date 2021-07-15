import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideInErrorAnimation = trigger('slideInError', [
  transition(':enter', [
    group([
      style({
        opacity: 0,
      }),
      animate(
        '150ms cubic-bezier(0.4, 0, 0.2, 1)',
        style({
          opacity: 1,
          height: '*',
          marginTop: '0.125rem',
        }),
      ),
      query('p', [
        style({
          transform: 'translateY(-2rem)',
        }),
        animate(
          '150ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({
            transform: 'translateY(0)',
          }),
        ),
      ]),
    ]),
  ]),
  transition(':leave', [
    group([
      animate(
        '150ms cubic-bezier(0.4, 0, 0.2, 1)',
        style({
          opacity: 0,
        }),
      ),
      query('p', [
        animate(
          '150ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({
            transform: 'translateY(-2rem)',
          }),
        ),
      ]),
    ]),
  ]),
]);
