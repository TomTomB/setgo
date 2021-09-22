import { NotificationGroup } from '@setgo/store/notifications';
import { TrackByFunction } from '@angular/core';

export const trackByNotificationGroup: TrackByFunction<NotificationGroup> = (
  index,
  item,
) => item.id;
