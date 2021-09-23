import { AuthFacade, fetchSignInMethodsForEmail } from '@setgo/store/auth';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MappedEntityState } from '@tomtomb/ngrx-toolkit';
import { ValidatorsExtra } from '@setgo/uikit/forms';
import { environment } from '@setgo/env';

@Component({
  selector: 'domain-identifier-view',
  templateUrl: './identifier.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentifierViewComponent {
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

  fetchSignInMethodsForEmail(email: string) {
    this.fetchSignInMethodsForEmailStore =
      this._authFacade.fetchSignInMethodsForEmail({
        body: { email },
      });
  }
}
