import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NotificationMessage } from '../../../types';
import { NotificationUiHandlerService } from '../../../services';
import { assertInputsAreProvided } from '@setgo/core';

@Component({
  selector: 'domain-notification',
  templateUrl: './notification.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {
  private _notificationSwipeHandlerId: string | null = null;

  @Input()
  notificationMessage!: NotificationMessage;

  @Output()
  deleteNotification = new EventEmitter<NotificationMessage>();

  constructor(
    private _notificationUiHandlerService: NotificationUiHandlerService,
  ) {}

  ngOnInit(): void {
    this._assertInputsAreProvided();
  }

  startNotificationSwipe(event: TouchEvent, element: HTMLLIElement) {
    this._notificationSwipeHandlerId =
      this._notificationUiHandlerService.startNotificationSwipe(event, element);
  }

  updateNotificationSwipe(event: TouchEvent) {
    if (!this._notificationSwipeHandlerId) {
      return;
    }

    const didSwipe = this._notificationUiHandlerService.updateNotificationSwipe(
      this._notificationSwipeHandlerId,
      event,
    );

    if (!didSwipe) {
      this._notificationSwipeHandlerId = null;
    }
  }

  endNotificationSwipe() {
    if (!this._notificationSwipeHandlerId) {
      return;
    }

    const shouldRemoveNotification =
      this._notificationUiHandlerService.endNotificationSwipe(
        this._notificationSwipeHandlerId,
      );
    this._notificationSwipeHandlerId = null;

    if (shouldRemoveNotification) {
      this.deleteNotification.emit(this.notificationMessage);
    }
  }

  private _assertInputsAreProvided() {
    assertInputsAreProvided({
      notificationData: this.notificationMessage,
    });
  }
}
