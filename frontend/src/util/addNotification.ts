import { notifications } from "../stores/notificationState";

export const addNotification = (notification: ToastNotification) => {
  notifications.update((val) => {
    val.push(notification);
    return val;
  });
};

export const addServerErrorNotification = () => {
  addNotification({
    type: "failure",
    message: "Something went boom on the server.",
  });
};
