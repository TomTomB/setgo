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
import { IconCollection } from '@setgo/uikit/core';
import { MappedEntityState } from '@tomtomb/ngrx-toolkit';
import {
  NotificationGroup,
  NotificationsFacade,
} from '@setgo/store/notifications';
import { Observable } from 'rxjs';
import { ServiceWorkerFacade } from '@setgo/store/service-worker';
import { TextFieldComponent, ValidatorsExtra } from '@setgo/uikit/forms';
import { UiShellFacade } from '@setgo/store/ui/shell';
import { UiTriggerAction, UpdateAvailableEventWithData } from '@setgo/types';
import { environment } from '@setgo/env';
import iconOutlineNotifications from '@iconify/icons-ic/outline-notifications';
import iconOutlineSettings from '@iconify/icons-ic/outline-settings';

@Component({
  selector: 'setgo-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    Animations.growShrink,
    Animations.scaleOvershoot,
    Animations.awaitInner,
  ],
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

  themeCtrl = new FormControl(null);

  availableUpdate$!: Observable<UpdateAvailableEventWithData | null>;

  notificationShadeVisibility$!: Observable<UiTriggerAction>;

  icons: IconCollection = {
    iconOutlineNotifications,
    iconOutlineSettings,
  };
  notifications$!: Observable<NotificationGroup[]>;

  get emailControl() {
    return this.emailForm.controls.email as FormControl;
  }

  constructor(
    private _authFacade: AuthFacade,
    private _serviceWorkerFacade: ServiceWorkerFacade,
    private _uiShellFacade: UiShellFacade,
    private _notificationsFacade: NotificationsFacade,
  ) {}

  ngOnInit(): void {
    this._serviceWorkerFacade.startPolling();

    this.notifications$ = this._notificationsFacade.notifications$;

    this.notificationShadeVisibility$ =
      this._uiShellFacade.notificationShadeVisibility$;

    const currentHardTheme = window.localStorage.getItem('theme');

    this.themeCtrl.setValue(currentHardTheme ?? 'system');

    this.themeCtrl.valueChanges.subscribe((v) => this.setTheme(v));

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

  setNotificationShadeVisibility(uiAction: UiTriggerAction) {
    this._uiShellFacade.dispatchSetNotificationShadeVisibility(uiAction);
  }

  update() {
    this._serviceWorkerFacade.dispatchActivateUpdate();
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

  setTheme(theme: 'light' | 'dark' | 'system') {
    if (theme === 'system') {
      window.localStorage.removeItem('theme');

      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', this._themeEventHandler);
    } else {
      window.localStorage.setItem('theme', theme);

      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  private _themeEventHandler(event: MediaQueryListEvent) {
    const currentHardTheme = window.localStorage.getItem('theme');

    if (currentHardTheme) {
      return;
    }

    if (event.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
