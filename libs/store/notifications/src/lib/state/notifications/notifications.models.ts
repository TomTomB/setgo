export interface GetFooArgs {
  queryParams: {
    slug: string;
  };
  params: {
    page: number;
  };
  body: {
    value: boolean;
  };
}

export interface RemoveNotificationMessageArgs {
  notificationGroupId: string;
  notificationMessageId: string;
}

export interface RemoveNotificationGroupArgs {
  notificationGroupId: string;
}

export interface AddNotificationMessageArgs {
  appletName: string;
  title: string;
  body: string;
  isFloating?: boolean;
  timestamp?: number;
}

export interface NotificationMessage {
  timestamp: number;
  title: string;
  body: string;
  isFloating: boolean;
  id: string;
}

export interface NotificationGroup {
  appletName: string;
  id: string;
  messages: NotificationMessage[];
}
