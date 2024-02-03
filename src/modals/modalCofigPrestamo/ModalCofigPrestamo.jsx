import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Switch,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import React from "react";

const ModalCofigPrestamo = ({ setIsVisible, isVisible }) => {
  console.log(isVisible);
  return (
    <Modal
      style={styles.container}
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <Text
          style={{
            color: "black",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          CONFIGURACIÓN
        </Text>
        <View style={styles.containerTPM}>
          <Text style={styles.text}>Tasa Prima Mensual: </Text>
          <TextInput style={styles.input}></TextInput>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCofigPrestamo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "beige",
    borderRadius: 2,
    position: "absolute",
    top: "15%",
    left: "10%",
    right: "10%",
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
  },
  containerTPM: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  Input: {
    textAlign: "center",
    color: "cornsilk",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  input: {
    height: 30,
    width: 120,
    //borderWidth: 1,
    borderBottomWidth: 1,
    //borderRadius: 15,
    padding: 2,
    paddingLeft: 10,
    color: "cornsilk",
  },
  text: {
    //fontWeight: "bold",
    fontSize: 15,
  },
});
