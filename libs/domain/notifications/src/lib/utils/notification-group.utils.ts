import {TrackByFunction} from '@angular/core';

import {NotificationGroup} from '../types';

export const trackByNotificationGroup: TrackByFunction<NotificationGroup> = (
    index,
    item,
    ) => item.id;
