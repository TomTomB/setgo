import {ChangeDetectionStrategy, Component, ViewEncapsulation,} from '@angular/core';

@Component({
  selector: 'uikit-common-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
}
