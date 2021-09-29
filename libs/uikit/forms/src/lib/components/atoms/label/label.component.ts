import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { assertInputsAreProvided } from '@setgo/core';

@Component({
  selector: 'uikit-forms-label',
  templateUrl: './label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LabelComponent implements OnInit {
  @Input()
  htmlFor!: string;

  @Input()
  isInvalid?: boolean;

  @Input()
  doFloat?: boolean;

  ngOnInit(): void {
    this._assertInputsAreProvided();
  }

  private _assertInputsAreProvided = () =>
    assertInputsAreProvided({
      htmlFor: this.htmlFor,
    });
}
