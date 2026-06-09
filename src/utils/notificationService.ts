import * as Notifications from "expo-notifications";

export const requestNotificationPermission = async (): Promise<boolean> => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
};

export const scheduleMealReminder = async (mealTime: Date): Promise<void> => {
  // Cancel any existing reminders first
  await Notifications.cancelAllScheduledNotificationsAsync();

  const granted = await requestNotificationPermission();
  if (!granted) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time to log your meal",
      body: "Don't forget to track your macros",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: mealTime.getHours(),
      minute: mealTime.getMinutes(),
    },
  });
};

export const cancelMealReminder = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
