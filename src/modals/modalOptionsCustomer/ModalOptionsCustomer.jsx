import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import ExportarData from "./ExportarData";
import ImportarData from "./ImportarData";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const optionsData = [
  { name: "Exportar Data", symbolName: "database-export" },
  { name: "Importar Data", symbolName: "database-import" },
];

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
              <TouchableOpacity
                onPress={() => options(element.name)}
                key={index}
                style={styles.optionsDataStyle}
              >
                <MaterialCommunityIcons
                  name={element.symbolName}
                  size={40}
                  color="rgb(36, 224, 221)"
                />
                <Text style={styles.text}>{element.name}</Text>
              </TouchableOpacity>
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
    backgroundColor: "rgba(16, 18, 20, 0.936)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
    padding: 5,
    position: "absolute",
    top: "1%",
    right: "1%",
  },
  text: {
    fontSize: 12,
    color: "white",
    alignSelf: "flex-end",
  },
  optionsDataStyle: {
    borderRadius: 2,
    borderColor: "white",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 5,
  },
});
