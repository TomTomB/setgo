import { Injectable } from '@angular/core';
import { v4 as uuidV4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class NotificationUiHandlerService {
  private _handlerMap: Record<
    string,
    {
      originClientX: number;
      originClientY: number;
      timestamp: number;
      movementX: number;
      movementY: number;
      isScrolling: boolean;
      isSwiping: boolean;
    }
  > = {};

  startSwipe(event: TouchEvent) {
    const handlerId = uuidV4();

    const originClientX = event.targetTouches[0].clientX;
    const originClientY = event.targetTouches[0].clientY;
    const timestamp = Date.now();

    this._handlerMap[handlerId] = {
      originClientX,
      originClientY,
      timestamp,
      movementX: 0,
      movementY: 0,
      isScrolling: false,
      isSwiping: false,
    };

    return handlerId;
  }

  updateSwipe(handlerId: string, event: TouchEvent) {
    const handler = this._getSwipeHandler(handlerId);
    const { originClientX, originClientY, isSwiping, isScrolling } = handler;

    const currentClientX = event.targetTouches[0].clientX;
    const currentClientY = event.targetTouches[0].clientY;

    const movementX = (originClientX - currentClientX) * -1;
    const movementY = originClientY - currentClientY;

    const positiveMovementY = movementY < 0 ? movementY * -1 : movementY;

    if (!isSwiping && !isScrolling) {
      if (positiveMovementY > movementX) {
        handler.isScrolling = true;
      } else {
        handler.isSwiping = true;
      }
    }

    handler.movementX = movementX;
    handler.movementY = movementY;

    return handler;
  }

  endSwipe(handlerId: string) {
    const { movementX, movementY, timestamp, originClientX, originClientY } =
      this._getSwipeHandler(handlerId);

    const timestampStart = timestamp;
    const timestampEnd = Date.now();

    const swipeTime = timestampEnd - timestampStart;

    const pixelPerMillisecondX = movementX / swipeTime;
    const pixelPerSecondX = pixelPerMillisecondX * 1000;

    const pixelPerMillisecondY = movementY / swipeTime;
    const pixelPerSecondY = pixelPerMillisecondY * 1000;

    delete this._handlerMap[handlerId];

    return {
      pixelPerSecondX,
      pixelPerSecondY,
      movementX,
      movementY,
      originClientX,
      originClientY,
    };
  }

  cancelSwipe(handlerId: string) {
    delete this._handlerMap[handlerId];
  }

  private _getSwipeHandler(handlerId: string) {
    const handler = this._handlerMap[handlerId];

    if (!handler) {
      throw new Error(`The swipe handler with id ${[handlerId]} was not found`);
    }

    return handler;
  }
}
