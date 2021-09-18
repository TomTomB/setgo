import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[uikit-common-button-cta]',
  templateUrl: './button-cta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonCTAComponent {
  @Input()
  isLoading?: boolean | null;

  @Input()
  isDisabled?: boolean | null;

  @Input()
  assertLoadingMessage = 'Loading, please wait...';

  @Input()
  rounded: 'both' | 'bottom' | 'top' = 'both';

  @HostBinding('attr.aria-disabled')
  get value() {
    return this.isLoading || this.isDisabled;
  }
}
