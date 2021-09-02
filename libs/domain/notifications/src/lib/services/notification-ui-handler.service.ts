import { Injectable } from '@angular/core';
import { NotificationConstants } from '../constants';
import { SwipeHandlerService } from '.';

@Injectable({
  providedIn: 'root',
})
export class NotificationUiHandlerService {
  private _notificationElementMap: Record<string, HTMLElement> = {};

  constructor(private _swipeHandlerService: SwipeHandlerService) {}

  startNotificationSwipe(event: TouchEvent, element: HTMLElement) {
    const handlerId = this._swipeHandlerService.startSwipe(event);

    element.classList.remove('transition-all');
    this._notificationElementMap[handlerId] = element;

    return handlerId;
  }

  updateNotificationSwipe(handlerId: string, event: TouchEvent) {
    const { isScrolling, movementX } = this._swipeHandlerService.updateSwipe(
      handlerId,
      event,
    );
    const notificationElement = this._getNotificationSwipeElement(handlerId);

    if (isScrolling) {
      this._swipeHandlerService.cancelSwipe(handlerId);
      delete this._notificationElementMap[handlerId];
      return false;
    }

    event.preventDefault();
    notificationElement.style.transform = `translateX(${movementX}px)`;

    return true;
  }

  endNotificationSwipe(handlerId: string) {
    const { movementX, pixelPerSecondX } =
      this._swipeHandlerService.endSwipe(handlerId);
    const notificationElement = this._getNotificationSwipeElement(handlerId);

    notificationElement.classList.add('transition-all');

    if (
      movementX > NotificationConstants.MIN_SWIPE_TO_DELETE_LENGTH ||
      movementX < -NotificationConstants.MIN_SWIPE_TO_DELETE_LENGTH ||
      pixelPerSecondX > NotificationConstants.MIN_VELOCITY_TO_DELETE
    ) {
      notificationElement.style.transform = `translateX(${
        movementX < 0 ? '-' : ''
      }100%)`;
      return true;
    }

    notificationElement.style.transform = '';

    return false;
  }

  private _getNotificationSwipeElement(handlerId: string) {
    const handler = this._notificationElementMap[handlerId];

    if (!handler) {
      throw new Error(
        `The notification swipe handler with id ${[handlerId]} was not found`,
      );
    }

    return handler;
  }
}
