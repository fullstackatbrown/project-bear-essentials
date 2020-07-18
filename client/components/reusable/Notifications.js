import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

const sampleNotification = { title: "done", body: "done!" };

// get permission for notifications on ios devices - when the app startup?
export const askNotification = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (Constants.isDevice && status === "granted")
    console.log("Notification permissions granted.");
};

// Schedules a local notification
export const scheduleNotification = (minutes) => {
  // Calculate time of notification
  let time = new Date().getTime() + Number(minutes * 60000);
  const schedulingOptions = {
    time: time,
  };

  Notifications.scheduleLocalNotificationAsync(
    sampleNotification,
    schedulingOptions
  );
};
