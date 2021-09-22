import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { Animations } from '@setgo/uikit/common';
import { IconCollection, LayoutService } from '@setgo/uikit/core';
import {
  NotificationGroup,
  NotificationMessage,
  NotificationsFacade,
} from '@setgo/store/notifications';
import { NotificationGroupComponent } from '../../molecules';
import { NotificationShadeConstants } from '../../../constants';
import { Observable } from 'rxjs';
import { SwipeHandlerService } from '../../../services/swipe-handler.service';
import { UiShellFacade } from '@setgo/store/ui/shell';
import { UiTriggerAction } from '@setgo/types';
import { animateNotificationShade } from '../../../animations';
import { trackByNotificationGroup } from '../../../utils';
import iconPartyPopper from '@iconify/icons-mdi/party-popper';

@Component({
  selector: 'domain-notification-shade',
  templateUrl: './notification-shade.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [animateNotificationShade, Animations.shrink, Animations.fade],
})
export class NotificationShadeComponent implements OnInit, AfterViewInit {
  private _swipeHandlerId: string | null = null;

  icons: IconCollection = {
    iconPartyPopper,
  };

  notifications$!: Observable<NotificationGroup[]>;
  trackByNotificationGroupFn = trackByNotificationGroup;

  notificationShadeVisibility$!: Observable<UiTriggerAction>;

  @ViewChildren(NotificationGroupComponent)
  notificationGroups?: QueryList<NotificationGroupComponent>;

  @ViewChild('notificationShade')
  notificationShadeElementRef?: ElementRef<HTMLDivElement>;

  isMobile$!: Observable<boolean>;

  constructor(
    private _uiShellFacade: UiShellFacade,
    private _swipeHandlerService: SwipeHandlerService,
    private _layoutService: LayoutService,
    private _notificationsFacade: NotificationsFacade,
  ) {}

  ngOnInit(): void {
    this.notificationShadeVisibility$ =
      this._uiShellFacade.notificationShadeVisibility$;

    this.isMobile$ = this._layoutService.isMobile$;

    this.notifications$ = this._notificationsFacade.notifications$;
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
    this._uiShellFacade.dispatchSetNotificationShadeVisibility('close');
  }

  deleteNotification(
    notificationGroup: NotificationGroup,
    notificationMessage: NotificationMessage,
  ) {
    this._notificationsFacade.removeNotification({
      notificationGroupId: notificationGroup.id,
      notificationId: notificationMessage.id,
    });
  }

  deleteNotificationGroup(notificationGroup: NotificationGroup) {
    this._notificationsFacade.removeNotificationGroup({
      notificationGroupId: notificationGroup.id,
    });
  }

  startHandleSwipe(event: TouchEvent) {
    if (!this.notificationShadeElementRef?.nativeElement) {
      return;
    }

    this._swipeHandlerId = this._swipeHandlerService.startSwipe(event);
    this.notificationShadeElementRef.nativeElement.classList.remove(
      'transition-transform',
    );
  }

  updateHandleSwipe(event: TouchEvent) {
    event.preventDefault();

    if (
      !this.notificationShadeElementRef?.nativeElement ||
      !this._swipeHandlerId
    ) {
      return;
    }

    const { movementY } = this._swipeHandlerService.updateSwipe(
      this._swipeHandlerId,
      event,
    );

    if (movementY < 0) {
      return;
    }

    this.notificationShadeElementRef.nativeElement.style.transform = `translateY(${
      movementY * -1
    }px)`;
  }

  endHandleSwipe() {
    if (
      !this.notificationShadeElementRef?.nativeElement ||
      !this._swipeHandlerId
    ) {
      return;
    }

    const { movementY, pixelPerSecondY } = this._swipeHandlerService.endSwipe(
      this._swipeHandlerId,
    );

    if (
      movementY > NotificationShadeConstants.MIN_SWIPE_TO_CLOSE_LENGTH ||
      pixelPerSecondY > NotificationShadeConstants.MIN_VELOCITY_TO_CLOSE
    ) {
      this.setNotificationShadeVisibility('close');
    } else {
      this.notificationShadeElementRef.nativeElement.classList.add(
        'transition-transform',
      );
      this.notificationShadeElementRef.nativeElement.style.transform = `translateY(0)`;
    }
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
