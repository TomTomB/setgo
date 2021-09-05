import {TrackByFunction} from '@angular/core';

import {NotificationMessage} from '../types';

export const trackByNotification: TrackByFunction<NotificationMessage> = (
    index,
    item,
    ) => item.id;
