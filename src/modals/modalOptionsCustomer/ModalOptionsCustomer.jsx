import {
  Modal,
  StyleSheet,
  Text,
  View,
  Share,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import ExportarData from "./ExportarData";
import ImportarData from "./ImportarData";

const optionsData = ["Exportar Data", "Importar Data"];

const ModalOptionsCustomer = ({ visible, setIsVisible }) => {
  const [exportData, setExportData] = useState(false);
  const [importData, setImportData] = useState(false);

  const options = (value) => {
    switch (value) {
      case "Exportar Data":
        setExportData(true);
        break;
      case "Importar Data":
        setImportData(true);
        break;
    }
    setIsVisible(false);
  };
  return (
    <View>
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
          {optionsData.map((element, index) => {
            return (
              <Pressable onPress={() => options(element)} key={index}>
                <Text style={styles.text}>{element}</Text>
              </Pressable>
            );
          })}
        </View>
      </Modal>

      {/* MODALES DE LAS OPCIONES */}
      <ExportarData exportData={exportData} setExportData={setExportData} />
      <ImportarData importData={importData} setImportData={setImportData} />
    </View>
  );
};

export default ModalOptionsCustomer;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "beige",
    borderRadius: 2,
    position: "absolute",
    top: "1%",
    right: "1%",
  },
  text: {
    fontSize: 17,
    color: "black",
    margin: 10,
  },
});
