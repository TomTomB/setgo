import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { NotificationGroup, NotificationMessage } from '../../../types';
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

  @Input()
  notificationGroup!: NotificationGroup;

  constructor(
    private _notificationUiHandlerService: NotificationUiHandlerService,
  ) {}

  ngOnInit(): void {
    this._assertInputsAreProvided();
  }

  startTouchHandling(event: TouchEvent, element: HTMLLIElement) {
    this._notificationSwipeHandlerId =
      this._notificationUiHandlerService.startSwipe(event);
  }

  updateTouchHandling(event: TouchEvent) {
    if (!this._notificationSwipeHandlerId) {
      return;
    }

    const handler = this._notificationUiHandlerService.updateSwipe(
      this._notificationSwipeHandlerId,
      event,
    );

    if (handler.isScrolling) {
      this._notificationUiHandlerService.cancelSwipe(
        this._notificationSwipeHandlerId,
      );
      return;
    }
  }

  endTouchHandling() {
    if (!this._notificationSwipeHandlerId) {
      return;
    }

    const swipeResult = this._notificationUiHandlerService.endSwipe(
      this._notificationSwipeHandlerId,
    );
    this._notificationSwipeHandlerId = null;
  }

  private _assertInputsAreProvided() {
    assertInputsAreProvided({
      notificationData: this.notificationMessage,
      notificationGroup: this.notificationGroup,
    });
  }
}
