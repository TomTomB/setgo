import { Animations } from '@setgo/uikit/common';
import { AuthFacade, fetchSignInMethodsForEmail } from '@setgo/store/auth';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MappedEntityState } from '@tomtomb/ngrx-toolkit';
import { NotificationsFacade } from '@setgo/store/notifications';
import { ServiceWorkerFacade } from '@setgo/store/service-worker';
import { TextFieldComponent, ValidatorsExtra } from '@setgo/uikit/forms';
import { environment } from '@setgo/env';

@Component({
  selector: 'setgo-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [Animations.growShrink],
})
export class AppComponent implements OnInit {
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

  constructor(
    private _authFacade: AuthFacade,
    private _serviceWorkerFacade: ServiceWorkerFacade,
    private _notificationsFacade: NotificationsFacade,
  ) {}

  ngOnInit(): void {
    this._serviceWorkerFacade.startPolling();

    this._serviceWorkerFacade.availableUpdate$.subscribe((v) => {
      if (v) {
        this._notificationsFacade.addNotificationMessage({
          appletName: 'SET.GO. Updater',
          body: v.available.appData.update.notes,
          title: `Aktualisierung verfügbar (v${v.available.appData.update.version.semver.version}) `,
        });
      }
    });
  }

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
}
