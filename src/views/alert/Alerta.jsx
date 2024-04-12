import { StyleSheet, Text, View, TextInput, Switch, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import registerForPushNotificationsAsync from "./getToken";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Alerta = ({ dataRed, dataGreen }) => {
  //! Mensaje de la notificación y repetir las notificaciones diariamente
  const scheduleTodoNotification = async () => {
    try {
      // Limpiar todas las notificaciones programadas existentes
      await Notifications.cancelAllScheduledNotificationsAsync();

      // Solicitar permiso para enviar notificaciones
      const { status } = await Notifications.requestPermissionsAsync();

      if (status === "granted") {
        // Configuramos la notificación para que se repita diariamente a las 9:00 AM
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Clientes por cobrar",
            body: ` Para hoy  ${dataGreen.length}, vencidos ${dataRed.length}`,
            //screen: "Clientes", // Nombre de la pantalla a la que se debe redirigir --> esta para analizar
          },
          trigger: {
            hour: 9,
            minute: 0,
            repeats: true, // Esto hace que la notificación se repita diariamente
          },
          ios: {
            sound: true,
          },
          android: {
            sound: true,
            priority: "high",
            sticky: false,
            vibrate: true,
          },
        });
      } else {
        console.log("Permiso de notificación denegado.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // LLamado a la función
  useEffect(() => {
    setTimeout(async () => {
      await scheduleTodoNotification();
    }, 0);
  }, []);

  //! Obtención del token
  const [expoPushToken, setExpoPushToken] = useState("");
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  // async function registerForPushNotificationsAsync() {
  //   let token;

  //   if (Platform.OS === "android") {
  //     await Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }

  //   if (Device.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     // Learn more about projectId:
  //     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
  //     token = (
  //       await Notifications.getExpoPushTokenAsync({
  //         projectId: "553ec5b6-a8cb-413a-a68c-6698a073d3ac",
  //       })
  //     ).data;
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }

  //   return token;
  // }
};

export default Alerta;
