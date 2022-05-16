import { notifications } from "../stores/notificationState";

export const addNotification = (notification: ToastNotification) => {
  notifications.update((val) => {
    val.push(notification);
    return val;
  });
};
