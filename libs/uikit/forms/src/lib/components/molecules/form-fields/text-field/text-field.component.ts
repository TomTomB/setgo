import {ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation,} from '@angular/core';
import {FormControl} from '@angular/forms';

import {slideInErrorAnimation} from '../../../../animations';
import {TextInputComponent} from '../../../atoms';

@Component({
  selector: 'uikit-forms-field-text',
  templateUrl: './text-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [slideInErrorAnimation],
})
export class TextFieldComponent {
  @Input() inputId!: string;

  @Input() label!: string;

  @Input() inputType: 'text'|'password'|'email' = 'text';

  @Input() inputAutocomplete?: string;

  @Input() inputSpellcheck = false;

  @Input() control = new FormControl();

  @ViewChild(TextInputComponent) inputComponentRef?: TextInputComponent;
}
