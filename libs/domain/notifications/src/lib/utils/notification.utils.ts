import { NotificationMessage } from '../types';
import { TrackByFunction } from '@angular/core';

export const trackByNotification: TrackByFunction<NotificationMessage> = (
  index,
  item,
) => item.id;
