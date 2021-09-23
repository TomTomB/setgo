import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[uikit-common-link-primary]',
  templateUrl: './link-primary.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkPrimaryComponent {
  @HostBinding('class')
  classes = `
    no-underline
    relative
    hover:after:scale-x-100 hover:text-black
    focus-visible:text-black
    dark:hover:text-white dark:focus-visible:text-white
    focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:after:hidden
    rounded
    after:from-brand-primary-light-light
    after:via-brand-primary-light
    after:to-brand-primary-light-dark
    dark:after:from-brand-primary-dark-light
    dark:after:via-brand-primary-dark
    dark:after:to-brand-primary-dark-dark
    outline-none
    transition-colors
    after:transition-transform
    after:absolute
    after:rounded-sm
    after:left-0
    after:bottom-[-3px]
    after:w-full
    after:h-0.5
    after:scale-x-[25%]
    after:origin-left
    after:bg-gradient-to-r
  `;
}
