import { StyleSheet, Text, View, TextInput, Switch, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

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
            hour: 21,
            minute: 50,
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

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
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
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "553ec5b6-a8cb-413a-a68c-6698a073d3ac",
        })
      ).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  return <View style={styles.container}></View>;
};

export default Alerta;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(31, 36, 36)",
  },
});

//! QUE LA ALERTA SEA LLAMDO DIARIAMENTE SIN EJECUTAR LA APLICACION

//? ESTO ES UNA OPCION PARA ENVIAR NOTIFICAIONES AUN CUANDO LA APLICACION NO ESTA EN USO
// const admin = require('firebase-admin');
// const serviceAccount = require('./path/to/serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://your-project-id.firebaseio.com',
// });

// const registrationToken = 'Expo Push Token del dispositivo';

// const message = {
//   data: {
//     title: 'Título de la Notificación',
//     body: 'Cuerpo de la Notificación',
//   },
//   token: registrationToken,
// };

// admin
//   .messaging()
//   .send(message)
//   .then((response) => {
//     console.log('Notificación enviada con éxito:', response);
//   })
//   .catch((error) => {
//     console.log('Error al enviar la notificación:', error);
//   });
