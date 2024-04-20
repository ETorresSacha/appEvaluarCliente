import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ModalLeyenda = ({ isVisible, setIsVisible }) => {
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
        <View>
          <Text>LEYENDA</Text>
        </View>

        <View style={styles.leyendaIcono}>
          <MaterialIcons name="notifications" style={{ color: "red" }} />
          <Text>Leyenda</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalLeyenda;

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
    top: "45%",
    left: "10%",
    right: "10%",
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
  },
  leyendaIcono: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
