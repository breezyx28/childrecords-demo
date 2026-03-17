export type NotificationItem = {
  id: number;
  data: {
    message: string;
    created_at: string;
    read: boolean;
  };
};

export type NotificationData = NotificationItem[];
