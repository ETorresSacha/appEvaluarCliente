import {
  StyleSheet,
  Text,
  View,
  Linking,
  Button,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Notification = ({ data }) => {
  const [message, setMessage] = useState("");

  // useEffect(()=>{
  //   setMessage()
  // },[])
  const handleIconNotification = (value) => {
    let aplication;
    switch (value) {
      case "whatsapp":
        aplication = `whatsapp://send?phone=${data[0]?.celular}&text=${message}`;
        break;

      case "phone-call":
        aplication = `tel:${data[0]?.celular}`;
        break;

      case "email-fast-outline":
        aplication = `mailto:${data[0]?.correo}`;
        break;
    }
    Linking.openURL(aplication);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.notificationTitle}>NOTIFICACIÓN</Text>
      </View>
      <View style={styles.containerMessage}>
        <Text style={styles.subTitle}>Mensaje: </Text>
        <TextInput
          value={message}
          style={styles.input}
          placeholder="Mensaje"
          placeholderTextColor="gray"
          // onChange={(event) => {
          //   handleChangeData(event, "nombre");
          // }}
          onChangeText={(text) => {
            setMessage(text);
          }}
          errorMessage="Error"
          //defaultValue="Mensaje"
        />
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
  subTitle: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    height: 80,
    borderWidth: 1,
    borderRadius: 15,
    padding: 2,
    paddingLeft: 10,
    color: "cornsilk",
  },
  containerMessage: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "red",
    paddingHorizontal: 25,
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
