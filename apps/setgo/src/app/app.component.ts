import { Animations } from '@setgo/uikit/common';
import { AuthFacade, fetchSignInMethodsForEmail } from '@setgo/store/auth';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MappedEntityState } from '@tomtomb/ngrx-toolkit';
import { TextFieldComponent, ValidatorsExtra } from '@setgo/uikit/forms';
import { environment } from '@setgo/env';

@Component({
  selector: 'setgo-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [Animations.growShrink],
})
export class AppComponent {
  @ViewChild(TextFieldComponent)
  emailFieldRef?: TextFieldComponent;

  version = environment.version;

  fetchSignInMethodsForEmailStore?: MappedEntityState<
    typeof fetchSignInMethodsForEmail
  >;

  emailForm = new FormGroup({
    email: new FormControl(null, [ValidatorsExtra.email, Validators.required]),
  });

  get emailControl() {
    return this.emailForm.controls.email as FormControl;
  }

  constructor(private _authFacade: AuthFacade) {}

  checkEmail() {
    if (this.emailForm.invalid) {
      this.emailFieldRef?.inputComponentRef?.nativeInputRef?.nativeElement.focus();
      return;
    }

    this.fetchSignInMethodsForEmailStore =
      this._authFacade.fetchSignInMethodsForEmail({
        body: { email: this.emailForm.value.email },
      });
  }

  setTheme(theme: 'light' | 'dark' | 'system') {
    if (theme === 'system') {
      window.localStorage.removeItem('theme');

      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      window.localStorage.setItem('theme', theme);

      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}
