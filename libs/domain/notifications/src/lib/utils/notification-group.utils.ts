import { NotificationGroup } from '../types';
import { TrackByFunction } from '@angular/core';

export const trackByNotificationGroup: TrackByFunction<NotificationGroup> = (
  index,
  item,
) => item.id;
