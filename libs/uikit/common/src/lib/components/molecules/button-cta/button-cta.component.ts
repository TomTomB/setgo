import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'uikit-common-button-cta',
  templateUrl: './button-cta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonCTAComponent {
  @Input()
  isLoading?: boolean;

  @Input()
  isDisabled?: boolean;

  @Input()
  assertLoadingMessage = 'Loading, please wait...';

  @Input()
  rounded: 'both' | 'bottom' | 'top' = 'both';

  @Input()
  type: 'button' | 'submit' | 'menu' | 'reset' = 'button';

  @Output()
  buttonCTAClick = new EventEmitter();
}
