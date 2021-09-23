import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[uikit-common-link-secondary]',
  templateUrl: './link-secondary.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkSecondaryComponent {
  @HostBinding('class')
  classes = `
    hover:text-black
    focus-visible:text-black
    dark:hover:text-white dark:focus-visible:text-white
    focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:no-underline
    rounded
    transition-colors
    underline
    text-xs
  `;
}
