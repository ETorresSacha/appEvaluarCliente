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

const Alerta = () => {
  const [withAlert, setWithAlert] = useState(false);

  var resultAgregardia = add(new Date(2014, 8, 1, 10, 19, 50), {
    years: 2,
    months: 9,
    weeks: 1,
    days: 7,
    hours: 5,
    minutes: 9,
    seconds: 30,
  });

  //! NOTIFICACIONES DE EXPO
  const scheduleTodoNotification = async () => {
    const date = new Date();
    const trigger = add(new Date(date), {
      //years: 2,
      //months: 9,
      // weeks: 1,
      //days: 7,
      //hours: 5,
      minutes: 1,
      //seconds: 30,
    });

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "alerta erik",
          body: "nuestra notificacion",
        },
        trigger,
      });
      console.log("notificacion creada");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCrearAlerta = async () => {
    if (withAlert) {
      await scheduleTodoNotification();
      Alert("se guardo correctamente");
    } else {
      console.log("no hay alerta");
    }
  };

  // const registerForPushNotificationsAsyn = async ()=>{
  //   let token
  //   if(Device.isDevice){
  //     const {status: exi}

  //   }
  // }

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
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textConfiguration}>CONFIGURACIÓN</Text>
        <View>
          <View style={styles.containerSwitch}>
            <View style={styles.switchBtn}>
              <Text style={styles.subTitle}>Alerta</Text>
              <Switch
                activeText={"On"}
                inActiveText={"Off"}
                onValueChange={(value) => {
                  setWithAlert(value);
                }}
                value={withAlert}
              />
            </View>
            {withAlert && (
              <Text style={{ color: "grey", fontSize: 12, maxWidth: "95%" }}>
                Recibirás una alerta a la hora que establezcas para este
                recordatorio.
              </Text>
            )}
          </View>
          <View>
            <Text style={styles.subTitle}>Mensaje</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Correo"
            placeholderTextColor="gray"
            //onChangeText={onChangeText}
            //value={text}
          />
        </View>
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
          onPress={() => handleCrearAlerta()}
        >
          CREAR ALERTA
        </Button>
      </View>
      <View>
        <Text style={styles.textConfiguration}>MENSAJE</Text>
      </View>
    </View>
  );
};

export default Alerta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
    display: "flex",
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

//! TRABAJAR EN ESTE COMPONENTE
