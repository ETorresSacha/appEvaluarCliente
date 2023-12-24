import { StyleSheet, Text, View, Linking, Button } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Notification = () => {
  const numeroTelefono = "tel:+123456789";
  const realizarLlamada = () => {
    Linking.openURL(numeroTelefono);
  };

  const correoElectronico = "mailto:destinatario@example.com"; // Reemplaza esto con la dirección de correo deseada

  const abrirCorreo = () => {
    Linking.openURL(correoElectronico);
  };
  const numeroWhatsapp =
    "whatsapp://send?phone=+123456789&text=Hola,%20¿cómo%20estás?"; // Reemplaza esto con el número y mensaje deseados

  const abrirWhatsapp = () => {
    Linking.openURL(numeroWhatsapp);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.notificationTitle}>NOTIFICACIÓN</Text>
      </View>
      <View style={styles.containerIcons}>
        <FontAwesome
          name="whatsapp"
          size={50}
          style={{ color: "rgb(66, 242, 46)" }}
          onPress={abrirWhatsapp}
        />
        <Feather
          name="phone-call"
          size={50}
          style={{ color: "rgb(46, 164, 242)" }}
          onPress={realizarLlamada}
        />
        <MaterialCommunityIcons
          name="email-fast-outline"
          size={50}
          style={{ color: "rgb(224, 240, 242)" }}
          onPress={abrirCorreo}
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
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    paddingLeft: 10,
    paddingVertical: 10,
    fontSize: 17,
    color: "cornsilk",
    fontWeight: "bold",
  },
  containerIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    // backgroundColor: "red",
    marginVertical: 20,
    //paddingVertical: 20,
  },
});
