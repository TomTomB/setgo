import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { assertInputsAreProvided } from '@setgo/core';

@Component({
  selector: 'uikit-forms-input-text',
  templateUrl: './text-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TextInputComponent implements OnInit {
  @Input()
  inputId!: string;

  @Input()
  inputType: 'text' | 'password' | 'email' = 'text';

  @Input()
  inputAutocomplete?: string;

  @Input()
  inputSpellcheck = false;

  @Input()
  control = new FormControl();

  @ViewChild('inputRef')
  nativeInputRef?: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this._assertInputsAreProvided();
  }

  private _assertInputsAreProvided = () =>
    assertInputsAreProvided({
      inputId: this.inputId,
      inputType: this.inputType,
      inputSpellcheck: this.inputSpellcheck,
      control: this.control,
    });
}
