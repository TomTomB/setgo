import { Animations } from '@setgo/uikit/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IconCollection } from '@setgo/uikit/core';
import {
  NotificationGroup,
  NotificationsFacade,
} from '@setgo/store/notifications';
import { Observable } from 'rxjs';
import { UiShellFacade } from '@setgo/store/ui/shell';
import { UiTriggerAction } from '@setgo/types';
import iconOutlineNotifications from '@iconify/icons-ic/outline-notifications';
import iconOutlineSettings from '@iconify/icons-ic/outline-settings';

@Component({
  selector: 'domain-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [Animations.scaleOvershoot, Animations.awaitInner],
})
export class HeaderComponent implements OnInit {
  themeCtrl = new FormControl(null);

  icons: IconCollection = {
    iconOutlineNotifications,
    iconOutlineSettings,
  };

  notifications$!: Observable<NotificationGroup[]>;
  notificationShadeVisibility$!: Observable<UiTriggerAction>;

  constructor(
    private _notificationsFacade: NotificationsFacade,
    private _uiShellFacade: UiShellFacade,
  ) {}

  ngOnInit(): void {
    this.notifications$ = this._notificationsFacade.notifications$;

    this.notificationShadeVisibility$ =
      this._uiShellFacade.notificationShadeVisibility$;

    const currentHardTheme = window.localStorage.getItem('theme');

    this.themeCtrl.setValue(currentHardTheme ?? 'system');

    this.themeCtrl.valueChanges.subscribe((v) => this.setTheme(v));
  }

  setNotificationShadeVisibility(uiAction: UiTriggerAction) {
    this._uiShellFacade.dispatchSetNotificationShadeVisibility(uiAction);
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
