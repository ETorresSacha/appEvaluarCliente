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

const ExportarData = ({ exportData, setExportData }) => {
  return (
    <Modal
      visible={exportData}
      transparent={true}
      onRequestClose={() => setExportData(false)}
    >
      <TouchableWithoutFeedback onPress={() => setExportData(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <Text>ExportarData</Text>
      </View>
    </Modal>
  );
};

export default ExportarData;

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
