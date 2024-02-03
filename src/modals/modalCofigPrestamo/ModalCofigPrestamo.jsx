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
          ACERCA DE LA APP
        </Text>
        <Text style={{ paddingBottom: 10 }}>
          Esta app te ayuda a llevar una buena administración de tus clientes,
          los cobros entre otros.
        </Text>

        <Text>Nombre: App Evaluar</Text>
        <Text>Versión: 1.0.0</Text>
        <Text>Creador: TorreDev</Text>
        <Text>Contacto: +51 - 964626322</Text>
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
});
