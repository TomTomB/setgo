import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation,} from '@angular/core';

@Component({
  selector: 'uikit-forms-label',
  templateUrl: './label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LabelComponent {
  @Input() htmlFor!: string;

  @Input() isInvalid?: boolean;

  @Input() doFloat?: boolean;
}
