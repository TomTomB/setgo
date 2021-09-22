import { NotificationMessage } from '@setgo/store/notifications';
import { TrackByFunction } from '@angular/core';

export const trackByNotification: TrackByFunction<NotificationMessage> = (
  index,
  item,
) => item.id;
