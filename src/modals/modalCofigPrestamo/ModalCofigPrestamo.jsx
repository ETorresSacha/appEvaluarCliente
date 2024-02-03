import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

const ModalCofigPrestamo = ({ handleModalClose, isVisible }) => {
  return (
    <Modal
      style={styles.container}
      transparent={true}
      visible={isVisible}
      onRequestClose={() => handleModalClose()}
    >
      <TouchableWithoutFeedback onPress={() => handleModalClose()}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <Text style={styles.titleModal}>CONFIGURACIÓN</Text>
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
  titleModal: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  containerTPM: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    height: 30,
    width: 120,
    borderBottomWidth: 1,
    padding: 2,
    paddingLeft: 10,
    color: "cornsilk",
  },
  text: {
    fontSize: 15,
  },
});
