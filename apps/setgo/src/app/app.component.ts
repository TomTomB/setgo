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
import { Observable } from 'rxjs';
import { RouterFacade } from '@setgo/store/router';
import { ServiceWorkerFacade } from '@setgo/store/service-worker';
import { TextFieldComponent, ValidatorsExtra } from '@setgo/uikit/forms';
import { UiShellFacade } from '@setgo/store/ui/shell';
import { UiTriggerAction, UpdateAvailableEventWithData } from '@setgo/types';
import { environment } from '@setgo/env';

interface NotificationGroup {
  appletName: string;
  id: string;
  messages: NotificationMessage[];
}

interface NotificationMessage {
  timestamp: number;
  title: string;
  body: string;
  id: string;
}

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

  isMouseDownOnNotification = false;

  get emailControl() {
    return this.emailForm.controls.email as FormControl;
  }

  constructor(
    private _authFacade: AuthFacade,
    private _serviceWorkerFacade: ServiceWorkerFacade,
    private _uiShellFacade: UiShellFacade,
    private _stuff: RouterFacade,
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

  notificationMouseDown(event: TouchEvent, element: HTMLDivElement) {
    this.isMouseDownOnNotification = true;

    element.classList.remove('transition-all');

    const currentClientX = event.targetTouches[0].clientX;
    const currentClientY = event.targetTouches[0].clientY;
    element.dataset.originClientX = currentClientX.toString();
    element.dataset.originClientY = currentClientY.toString();
    element.dataset.timestamp = Date.now().toString();
  }

  notificationMouseMove(event: TouchEvent, element: HTMLDivElement) {
    if (!this.isMouseDownOnNotification || element.dataset.isScrolling) {
      return;
    }

    const currentClientX = event.targetTouches[0].clientX;
    const currentClientY = event.targetTouches[0].clientY;

    const originClientX = parseInt(element.dataset.originClientX || '0');
    const originClientY = parseInt(element.dataset.originClientY || '0');

    const movementX = (originClientX - currentClientX) * -1;
    const movementY = originClientY - currentClientY;

    const positiveMovementY = movementY < 0 ? movementY * -1 : movementY;

    if (!element.dataset.isDragging) {
      if (positiveMovementY > movementX) {
        element.dataset.isScrolling = 'true';
        return;
      } else {
        element.dataset.isDragging = 'true';
      }
    }

    event.preventDefault();

    element.dataset.movement = movementX.toString();

    element.style.transform = `translateX(${movementX}px)`;
  }

  notificationMouseUp(
    event: TouchEvent,
    notificationGroup: NotificationGroup,
    notificationMessage: NotificationMessage,
    element: HTMLDivElement,
  ) {
    element.classList.add('transition-all');

    const movement = +(element.dataset.movement || '0');
    const timestampStart = +(element.dataset.timestamp || '0');
    const timestampEnd = Date.now();

    const swipeTime = timestampEnd - timestampStart;
    const pixelPerMillisecond = movement / swipeTime;
    const pixelPerSecond = pixelPerMillisecond * 1000;

    if (movement > 150 || movement < -150 || pixelPerSecond > 150) {
      element.style.transform = `translateX(${movement < 0 ? '-' : ''}100%)`;

      notificationGroup.messages = notificationGroup.messages.filter(
        (m) => m.id !== notificationMessage.id,
      );
      if (!notificationGroup.messages.length) {
        this.notifications = this.notifications.filter(
          (group) => group.id !== notificationGroup.id,
        );
      }
    } else {
      delete element.dataset.originClientX;
      delete element.dataset.originClientY;
      delete element.dataset.movement;
      delete element.dataset.isScrolling;
      delete element.dataset.isDragging;
      delete element.dataset.timestamp;
      element.style.transform = '';
    }
  }

  notificationGroupMouseDown(event: TouchEvent, element: HTMLDivElement) {
    this.isMouseDownOnNotification = true;

    element.classList.remove('transition-all');

    const currentClientX = event.targetTouches[0].clientX;
    const currentClientY = event.targetTouches[0].clientY;
    element.dataset.originClientX = currentClientX.toString();
    element.dataset.originClientY = currentClientY.toString();
    element.dataset.timestamp = Date.now().toString();
  }

  notificationGroupMouseMove(event: TouchEvent, element: HTMLDivElement) {
    if (!this.isMouseDownOnNotification || element.dataset.isScrolling) {
      return;
    }

    const currentClientX = event.targetTouches[0].clientX;
    const currentClientY = event.targetTouches[0].clientY;

    const originClientX = parseInt(element.dataset.originClientX || '0');
    const originClientY = parseInt(element.dataset.originClientY || '0');

    const movementX = (originClientX - currentClientX) * -1;
    const movementY = originClientY - currentClientY;

    const positiveMovementY = movementY < 0 ? movementY * -1 : movementY;

    if (!element.dataset.isDragging) {
      if (positiveMovementY > movementX) {
        element.dataset.isScrolling = 'true';
        return;
      } else {
        element.dataset.isDragging = 'true';
      }
    }

    event.preventDefault();

    element.dataset.movement = movementX.toString();

    element.style.transform = `translateX(${movementX}px)`;
  }

  notificationGroupMouseUp(
    event: TouchEvent,
    notificationGroup: NotificationGroup,
    element: HTMLDivElement,
  ) {
    element.classList.add('transition-all');

    const movement = +(element.dataset.movement || '0');
    const timestampStart = +(element.dataset.timestamp || '0');
    const timestampEnd = Date.now();

    const swipeTime = timestampEnd - timestampStart;
    const pixelPerMillisecond = movement / swipeTime;
    const pixelPerSecond = pixelPerMillisecond * 1000;

    if (movement > 150 || movement < -150 || pixelPerSecond > 150) {
      element.style.transform = `translateX(${movement < 0 ? '-' : ''}100%)`;

      this.notifications = this.notifications.filter(
        (group) => group.id !== notificationGroup.id,
      );
    } else {
      delete element.dataset.originClientX;
      delete element.dataset.originClientY;
      delete element.dataset.movement;
      delete element.dataset.isScrolling;
      delete element.dataset.isDragging;
      delete element.dataset.timestamp;
      element.style.transform = '';
      element.classList.add('transition-all');
    }
  }
}
