import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
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
            data: { screen: "Clientes" }, // Vista a la que dirigirse
          },
          trigger: {
            hour: 22,
            minute: 8,
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
};

export default Alerta;

//! tenemos que buscar la forma como redirigir al componente correcto o deseado
