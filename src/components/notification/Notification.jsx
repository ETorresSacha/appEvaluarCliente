import {
  StyleSheet,
  Text,
  View,
  Linking,
  Button,
  TextInput,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { formatDate } from "../../utils/thunks/Thunks";

const Notification = ({ data, color }) => {
  console.log(color);
  const [message, setMessage] = useState("");
  const [datePay, setDayPay] = useState();
  const [withAlert, setWithAlert] = useState(false);

  // Iconos de notificacion
  const handleIconNotification = (value) => {
    let aplication;
    switch (value) {
      case "whatsapp":
        aplication = `whatsapp://send?phone=${data[0]?.celular}&text=${message}`;
        console.log(message);
        break;

      case "phone-call":
        aplication = `tel:${data[0]?.celular}`;
        break;

      case "email-fast-outline":
        aplication = `mailto:${data[0]?.correo}?subject=Pago de la cuota N° ${datePay?.cuota}&body=${message}`;
        break;
    }
    Linking.openURL(aplication);
  };

  // Fecha de pago actualizado
  useEffect(() => {
    let result = data[0]?.resultPrestamo.find(
      (element) => element.statusPay == false
    );

    if (result != undefined) {
      setDayPay(result);
    }
    if (result == undefined) {
      setDayPay(data[0]?.resultPrestamo[data[0]?.resultPrestamo.length - 1]);
    }
  }, [data]);

  // Actualiza message

  useEffect(() => {
    if (datePay != undefined) {
      const messagePredetermined = `Hola ${
        data[0]?.nombre?.split(" ")[0]
      }, tienes una deuda pendiente de ${
        data[0]?.resultPrestamo[0]?.montoCuota
      } soles y ${color == "red" ? "venció" : "vence"} el día ${formatDate(
        datePay?.fechaPago
      )}, ${
        color == "red" ? "evita que suba tu mora" : "evita la mora"
      } y paga hoy. ¡Gracias! 😉`;

      color !== null ? setMessage(messagePredetermined) : setMessage(``);
    }
  }, [datePay, color]);

  return (
    <View style={styles.container}>
      <View style={styles.notificationTitle}>
        <Text style={styles.title}>NOTIFICACIÓN</Text>
        <FontAwesome
          name="gear"
          size={30}
          style={{ color: "cornsilk" }}
          //onPress={() => handleIconNotification("whatsapp")}
        />
      </View>
      {/* <View style={styles.containerMessage}>
        <Text style={styles.subTitle}>Mensaje predeterminado </Text>
        <TextInput
          multiline
          value={message}
          style={styles.input}
          placeholder="Mensaje"
          placeholderTextColor="gray"
          onChangeText={(text) => {
            setMessage(text);
          }}
          errorMessage="Error"
        />
      </View> */}
      <View style={styles.containerSwitch}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={styles.subTitle}>Institución: </Text>
          <Text style={styles.subTitle}>Anónimo</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <MaterialCommunityIcons
            name="lightbulb-on"
            style={{ color: "yellow", fontSize: 30 }}
          />
          <Text style={styles.subTitle}>activo</Text>
        </View>

        {/* <Text style={styles.subTitle}>Alerta</Text> */}
        {/* <Switch
          value={withAlert}
          onValueChange={(value) => {
            setWithAlert(value);
          }}
          activeText={"On"}
          inActiveText={"Off"}
          trackColor={{ false: "grey", true: "rgb(63, 252, 236)" }}
          thumbColor={withAlert ? "rgb(63, 252, 236)" : "#f4f3f4"}
        /> */}
      </View>
      <View style={styles.containerIcons}>
        <FontAwesome
          name="whatsapp"
          size={50}
          style={{ color: "rgb(66, 242, 46)" }}
          onPress={() => handleIconNotification("whatsapp")}
        />
        <Feather
          name="phone-call"
          size={50}
          style={{ color: "rgb(46, 164, 242)" }}
          onPress={() => handleIconNotification("phone-call")}
        />
        <MaterialCommunityIcons
          name="email-fast-outline"
          size={50}
          style={{ color: "rgb(224, 240, 242)" }}
          onPress={() => handleIconNotification("email-fast-outline")}
        />
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    //paddingBottom: 20,
  },

  notificationTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    paddingHorizontal: 15,
  },
  title: {
    paddingVertical: 10,
    color: "cornsilk",
    fontSize: 17,
    fontWeight: "bold",
  },
  containerIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    //backgroundColor: "green",
  },
  input: {
    flex: 1,
    height: 70,
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
    color: "cornsilk",
    borderColor: "white",
    fontSize: 13,
  },
  containerMessage: {
    display: "flex",
    //flexDirection: "row",
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  containerSwitch: {
    //flex: 1,
    display: "flex",
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    //backgroundColor: "red",
  },
});
