import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

const Configuration = ({ enablerConf, setEnableConf }) => {
  //! FALTA DARLE ESTILOS Y MEJORAR ESTE MODAL (CAMBIAR DE NOMBRE DEL MODAL, "ACERCA DE")
  return (
    <Modal
      // style={styles.container}
      transparent={true}
      visible={enablerConf}
      onRequestClose={() => setEnableConf(false)}
    >
      <TouchableWithoutFeedback onPress={() => setEnableConf(false)}>
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
        <Text>
          Esta app te ayuda a llevar una buena administración de tus clientes,
          los cobros, las moras entre otros.
        </Text>

        <Text>Nombre: App Evaluar</Text>
        <Text>Versión: 1.0.0</Text>
        <Text>Creador: TorreDev</Text>
        <Text>contacto: +51-964626322</Text>
      </View>
    </Modal>
  );
};

export default Configuration;

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
    paddingVertical: 10,
  },

  containerText: {
    marginTop: 10,
    //gap: 5,
  },
  titleText: {
    paddingLeft: 20,
    fontSize: 18,
    color: "black",
  },
  text: {
    height: 40,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "grey",
    padding: 2,
    marginVertical: 5,
    marginHorizontal: 25,
    paddingLeft: 10,
    fontSize: 16,
    color: "black",
  },
  buttonContainer: {
    marginVertical: 30,
    alignItems: "center",
    width: 250,
    height: 40,
    marginLeft: 40,
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#4ecb71",
  },
  textGuardar: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  containerConfiguration: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
