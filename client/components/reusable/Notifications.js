import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

// get permission for notifications on ios devices - when the app startup?
export const askNotification = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (Constants.isDevice && status === "granted")
    console.log("Notification permissions granted.");
};

// Schedules a local notification
// returns id of notification
export const scheduleNotification = async (title, body, minutes) => {
  const notifContent = { title, body };

  let time = new Date().getTime() + Number(minutes * 60000);
  const schedulingOptions = { time };

  const notifId = await Notifications.scheduleLocalNotificationAsync(
    notifContent,
    schedulingOptions
  );
  return [notifId, time];
};

export const cancelNotification = (id) => {
  console.log("[CANCELLED NOTIFICATION]");
  Notifications.cancelScheduledNotificationAsync(id);
};
