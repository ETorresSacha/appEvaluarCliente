import {
  StyleSheet,
  Text,
  View,
  Linking,
  Button,
  TextInput,
  Switch,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { formatDate } from "../../utils/thunks/Thunks";

const Notification = ({ data, color }) => {
  const [message, setMessage] = useState("");
  const [datePay, setDayPay] = useState();

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

  // Cerrar el modal
  const handleModalClose = async (shouldUpdate) => {
    if (shouldUpdate) {
      Alert.alert("Se guardó correctamente");
      //loadFoods();
    }
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.notificationTitle}>
        <Text style={styles.title}>NOTIFICACIÓN</Text>
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
    paddingVertical: 20,
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
    paddingVertical: 50,
  },
});
