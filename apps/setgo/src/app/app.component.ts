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
  NotificationMessage,
  trackByNotificationGroup,
} from '@setgo/domain/notifications';
import { Observable } from 'rxjs';
import { ServiceWorkerFacade } from '@setgo/store/service-worker';
import { TextFieldComponent, ValidatorsExtra } from '@setgo/uikit/forms';
import { UiShellFacade } from '@setgo/store/ui/shell';
import { UiTriggerAction, UpdateAvailableEventWithData } from '@setgo/types';
import { environment } from '@setgo/env';
import iconOutlineNotifications from '@iconify/icons-ic/outline-notifications';

const notifications: NotificationGroup[] = [];

for (let i = 0; i < 10; i++) {
  notifications.push({
    appletName: 'Updater ' + i,
    id: i.toString(),
    messages: [
      {
        timestamp: Date.now(),
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        title: 'Ein Update steht zur Verfügung',
        id: `${i}_0`,
      },
      {
        timestamp: Date.now(),
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        title: 'Update installiert',
        id: `${i}_1`,
      },
    ],
  });
}

@Component({
  selector: 'setgo-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    Animations.growShrink,
    Animations.slideFromTop,
    Animations.fade,
    Animations.shrink,
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

  hasAvailableUpdate$!: Observable<boolean>;
  availableUpdate$!: Observable<UpdateAvailableEventWithData | null>;

  notificationShadeVisibility$!: Observable<UiTriggerAction>;

  notifications = notifications;

  trackByNotificationGroupFn = trackByNotificationGroup;

  icons: IconCollection = {
    iconOutlineNotifications,
  };

  get emailControl() {
    return this.emailForm.controls.email as FormControl;
  }

  constructor(
    private _authFacade: AuthFacade,
    private _serviceWorkerFacade: ServiceWorkerFacade,
    private _uiShellFacade: UiShellFacade,
  ) {}

  ngOnInit(): void {
    this._serviceWorkerFacade.startPolling();

    this.hasAvailableUpdate$ = this._serviceWorkerFacade.hasAvailableUpdate$;
    this.availableUpdate$ = this._serviceWorkerFacade.availableUpdate$;

    this.notificationShadeVisibility$ =
      this._uiShellFacade.notificationShadeVisibility$;
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
    } else {
      window.localStorage.setItem('theme', theme);

      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  setNotificationShadeVisibility(uiAction: UiTriggerAction) {
    this._uiShellFacade.dispatchSetNotificationShadeVisibility(uiAction);
  }

  clearAllNotifications() {
    this.notifications = [];
    this._uiShellFacade.dispatchSetNotificationShadeVisibility('close');
  }

  deleteNotification(
    notificationGroup: NotificationGroup,
    notificationMessage: NotificationMessage,
  ) {
    notificationGroup.messages = notificationGroup.messages.filter(
      (m) => m.id !== notificationMessage.id,
    );
    if (!notificationGroup.messages.length) {
      this.notifications = this.notifications.filter(
        (group) => group.id !== notificationGroup.id,
      );
    }
  }

  deleteNotificationGroup(notificationGroup: NotificationGroup) {
    this.notifications = this.notifications.filter(
      (group) => group.id !== notificationGroup.id,
    );
  }
}
