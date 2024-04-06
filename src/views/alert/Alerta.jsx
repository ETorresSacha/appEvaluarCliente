import { StyleSheet, Text, View, TextInput, Switch, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { add } from "date-fns";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

import Button from "react-native-button";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Alerta = ({ dataRed, dataGreen }) => {
  // PROGRAMAR A LA HORA QUE SE LANZARÁ LA ALERTA
  const timeAlert = () => {
    let horaActual = new Date();
    let horaProgramada = new Date();
    horaProgramada.setHours(9);
    horaProgramada.setMinutes(0);
    horaProgramada.setSeconds(0);

    return horaProgramada.getTime() - horaActual.getTime();
  };

  //! NOTIFICACIONES DE EXPO
  const scheduleTodoNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Clientes por cobrar",
          body: ` Para hoy  ${dataGreen.length}, vencidos ${dataRed.length}`,
          data: { clientes: "a" },
        },
        trigger: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    setTimeout(async () => {
      await scheduleTodoNotification();
    }, timeAlert());
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Button
          style={{
            fontSize: 20,
            color: "orange",
            borderColor: "orange",
            borderWidth: 1,
            borderRadius: 10,
            //width: 100,
            justifyContent: "center",
          }}
          styleDisabled={{ color: "red" }}
        >
          CREAR ALERTA
        </Button>
      </View>
      {/* <View>
        <Text style={styles.textConfiguration}>MENSAJE</Text>
      </View> */}
    </View>
  );
};

export default Alerta;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
    //display: "flex",
  },
  textConfiguration: {
    fontSize: 17,
    color: "white",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    paddingLeft: 7,
    paddingVertical: 5,
    fontWeight: "bold",
  },
  input: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    color: "cornsilk",
    borderRadius: 10,
  },
  subTitle: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  containerSwitch: {
    padding: 10,
    height: 80,
    display: "flex",
    flexDirection: "column",
    //backgroundColor: "red",
    //justifyContent: "space-evenly",
  },
  switchBtn: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnSwitch: {
    width: 50,
  },
});

//! HACER QUE LA ALERTA SE LLAME  A UNA HORA EN ESPECIFICO, CADA DIA
//! QUE LA ALERTA SEA LLAMDO DIARIAMENTE SIN EJECUTAR LA APLICACION
//! EL BOTON DE CREAR ALERTA NO EXISTA, QUE SE EJECUTE DE MANERA AUTOMATICA
