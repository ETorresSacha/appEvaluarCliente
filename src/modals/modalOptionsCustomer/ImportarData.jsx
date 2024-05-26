import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";

const ImportarData = ({ importData, setImportData }) => {
  return (
    <Modal
      visible={importData}
      transparent={true}
      onRequestClose={() => setImportData(false)}
    >
      <TouchableWithoutFeedback onPress={() => setImportData(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <Text>Import data</Text>
      </View>
    </Modal>
  );
};

export default ImportarData;

const styles = StyleSheet.create({
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
