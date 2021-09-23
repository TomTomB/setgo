import { Animations } from '@setgo/uikit/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Error } from '@tomtomb/ngrx-toolkit';
import { FormControl, FormGroup } from '@angular/forms';
import { TextFieldComponent } from '@setgo/uikit/forms';
import { Version } from '@setgo/types';

@Component({
  selector: 'domain-identifier-template',
  templateUrl: './identifier.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [Animations.growShrink],
})
export class IdentifierTemplateComponent {
  @Input()
  fetchSignInMethodsForEmailStoreIsLoading: boolean | null = false;

  @Input()
  fetchSignInMethodsForEmailStoreError: Error | null = null;

  @Input()
  emailControl!: FormControl;

  @Input()
  emailForm!: FormGroup;

  @Input()
  version!: Version;

  @Output()
  identifierSubmit = new EventEmitter<string>();

  @ViewChild(TextFieldComponent)
  emailFieldRef?: TextFieldComponent;

  emitCheckEmail(email: string) {
    if (this.emailForm.invalid) {
      this.emailFieldRef?.inputComponentRef?.nativeInputRef?.nativeElement.focus();
      return;
    }

    this.identifierSubmit.emit(email);
  }
}
