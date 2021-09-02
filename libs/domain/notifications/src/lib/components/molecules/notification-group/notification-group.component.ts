import { Animations } from '@setgo/uikit/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NotificationGroup, NotificationMessage } from '../../../types';
import { NotificationUiHandlerService } from '../../../services';
import { assertInputsAreProvided } from '@setgo/core';
import { trackByNotification } from '../../../utils';

@Component({
  selector: 'domain-notification-group',
  templateUrl: './notification-group.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [Animations.shrink],
})
export class NotificationGroupComponent implements OnInit {
  private _notificationGroupSwipeHandlerId: string | null = null;

  @Input()
  notificationGroup!: NotificationGroup;

  @Input()
  showTopHorizontalLine = false;

  @Output()
  deleteNotificationGroup = new EventEmitter<NotificationGroup>();

  @Output()
  deleteNotification = new EventEmitter<NotificationMessage>();

  trackByNotificationFn = trackByNotification;

  constructor(
    private _notificationUiHandlerService: NotificationUiHandlerService,
  ) {}

  ngOnInit(): void {
    this._assertInputsAreProvided();
  }

  startNotificationGroupSwipe(event: TouchEvent, element: HTMLDivElement) {
    this._notificationGroupSwipeHandlerId =
      this._notificationUiHandlerService.startNotificationSwipe(event, element);
  }

  updateNotificationGroupSwipe(event: TouchEvent) {
    if (!this._notificationGroupSwipeHandlerId) {
      return;
    }

    const didSwipe = this._notificationUiHandlerService.updateNotificationSwipe(
      this._notificationGroupSwipeHandlerId,
      event,
    );

    if (!didSwipe) {
      this._notificationGroupSwipeHandlerId = null;
    }
  }

  endNotificationGroupSwipe() {
    if (!this._notificationGroupSwipeHandlerId) {
      return;
    }

    const shouldRemoveNotificationGroup =
      this._notificationUiHandlerService.endNotificationSwipe(
        this._notificationGroupSwipeHandlerId,
      );
    this._notificationGroupSwipeHandlerId = null;

    if (shouldRemoveNotificationGroup) {
      this.deleteNotificationGroup.emit(this.notificationGroup);
    }
  }

  private _assertInputsAreProvided() {
    assertInputsAreProvided({
      notificationGroup: this.notificationGroup,
    });
  }
}
