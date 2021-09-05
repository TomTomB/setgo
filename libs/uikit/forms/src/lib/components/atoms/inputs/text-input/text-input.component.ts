import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation,} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'uikit-forms-input-text',
  templateUrl: './text-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TextInputComponent {
  @Input() inputId!: string;

  @Input() inputType: 'text'|'password'|'email' = 'text';

  @Input() inputAutocomplete?: string;

  @Input() inputSpellcheck = false;

  @Input() control = new FormControl();

  @ViewChild('inputRef') nativeInputRef?: ElementRef<HTMLInputElement>;
}
