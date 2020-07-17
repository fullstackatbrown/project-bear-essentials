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

// send notification right now
export const sendNotification = () => {
  Notifications.presentLocalNotificationAsync(sampleNotification);
};

export const scheduleNotification = (minutes) => {
  // get time with delay in minutes
  let delay = new Date().getTime() + Number(minutes * 60000);
  const schedulingOptions = {
    time: delay,
  };

  // set the scheduled notification
  Notifications.scheduleLocalNotificationAsync(
    sampleNotification,
    schedulingOptions
  );
};
