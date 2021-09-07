import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { Animations } from '@setgo/uikit/common';
import { IconCollection } from '@setgo/uikit/core';
import { NOTIFICATION_GROUP_WITH_MESSAGES_MOCK } from '../../../mocks';
import { NotificationGroup, NotificationMessage } from '../../../types';
import { NotificationGroupComponent } from '../../molecules';
import { Observable } from 'rxjs';
import { UiShellFacade } from '@setgo/store/ui/shell';
import { UiTriggerAction } from '@setgo/types';
import { trackByNotificationGroup } from '../../../utils';
import iconPartyPopper from '@iconify/icons-mdi/party-popper';

@Component({
  selector: 'domain-notification-shade',
  templateUrl: './notification-shade.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [Animations.slideFromTop, Animations.fade, Animations.shrink],
})
export class NotificationShadeComponent implements OnInit, AfterViewInit {
  icons: IconCollection = {
    iconPartyPopper,
  };

  notifications = NOTIFICATION_GROUP_WITH_MESSAGES_MOCK;
  trackByNotificationGroupFn = trackByNotificationGroup;

  notificationShadeVisibility$!: Observable<UiTriggerAction>;

  @ViewChildren(NotificationGroupComponent)
  notificationGroups?: QueryList<NotificationGroupComponent>;

  constructor(private _uiShellFacade: UiShellFacade) {}

  ngOnInit(): void {
    this.notificationShadeVisibility$ =
      this._uiShellFacade.notificationShadeVisibility$;
  }

  ngAfterViewInit(): void {
    this._setupFocus();
  }

  @HostListener('keyup', ['$event'])
  notificationShadeKeyUp(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.setNotificationShadeVisibility('close');
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

  private _setupFocus() {
    const firstNotificationGroup = this.notificationGroups?.first;

    if (!firstNotificationGroup) {
      // TODO(TRB): What to focus now?
      return;
    }

    firstNotificationGroup.focusDelete();
  }
}
