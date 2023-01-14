import { View, Text } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldSetBadge: true,
  }),
});

export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return null;
}

export async function schedulePushNotification() {
  const time = new Date();
  const day = time.getDate();
  const month = time.getMonth() + 1;
  const trigger = {
    hour: 10,
    minute: 0,
    repeats: true,
  };
  if (day === 20 && month === 11) {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Winter is coming",
        body: `Don't forget to put on your winter tires by 1 decemeber.`,
      },
      trigger,
    });
    console.log("notif id on scheduling: ", id);
  } else if (day === 1 && month === 12) {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Winter is coming",
        body: `It is time to put winter tires on!`,
      },
      trigger,
    });
    console.log("notif id on scheduling: ", id);
    return id;
  } else if (day === 31 && month === 3) {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Winter is over",
        body: `Don't forget to put on summer tires by 15 april.`,
      },
      trigger,
    });
    console.log("notif id on scheduling: ", id);
  } else if (day === 20 && month === 11) {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Winter is over",
        body: `You need to remove your winter tires today if you haven't already.`,
      },
      trigger,
    });
    console.log("notif id on scheduling: ", id);
  }
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      bypassDnd: true,
    });
  }

  return token;
}

export async function cancelNotification(id) {
  await Notifications.cancelScheduledNotificationAsync(id);
}
