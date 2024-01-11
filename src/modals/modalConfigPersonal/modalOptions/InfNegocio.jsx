import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Modal,
  Switch,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import UseStorageBusiness from "../../../components/hooks/UseHookDataNeg";
import { validationInfNegocios } from "../../../utils/validation/Validation";

const InfNegocio = ({ enablerNeg, setEnableNeg }) => {
  const { onSaveDataBusiness, onGetBusiness } = UseStorageBusiness();

  const [data, setData] = useState({
    negocio: "",
    direccion: "",
    celular: "",
  });

  // Cargar los datos de la financiera
  const loadNegocio = async () => {
    try {
      const result = await onGetBusiness();
      //setDataNegocio(result);
      setData({
        ...data,
        negocio: result[0]?.negocio,
        direccion: result[0]?.direccion,
        celular: result[0]?.celular,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNegocio();
  }, []);

  // GUARDAR LOS DATOS DE LA CONFIGURACIÓN DEL NEGOCIO
  const handleDataKeep = async () => {
    // Validación
    let errorData = validationInfNegocios(data);

    let valuesText = Object.values(errorData);
    if (valuesText.some((error) => error != "")) {
      Alert.alert("El número de celular debe tener 9 caracteres");
    } else {
      try {
        Alert.alert("GUARDAR", "¿Desea continuar?", [
          {
            text: "Si",
            onPress: async () => {
              await onSaveDataBusiness({
                negocio: data.negocio,
                direccion: data.direccion,
                celular: data.celular,
              });

              Alert.alert("Se guardó correctamente");
              setEnableNeg(false);
            },
            style: "destructive",
          },
          {
            text: "No",
            style: "destructive",
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // CERRAR EL MODAL
  const handleCloseModal = () => {
    Alert.alert("GUARDAR", "¿Desea guardar los cambios?", [
      {
        text: "Si",
        onPress: async () => handleDataKeep(),
        style: "destructive",
      },
      {
        text: "No",
        onPress: async () => setEnableNeg(false),
        style: "destructive",
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Modal
        // style={styles.container}
        transparent={true}
        visible={enablerNeg}
        onRequestClose={() => setEnableNeg(false)}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                width: "70%",
              }}
            >
              INFORMACIÓN DE LA FINANCIERA
            </Text>
          </View>

          {/* ------------------ NOMBRE ------------------*/}
          <View style={styles.containerText}>
            <Text style={styles.titleText}>Financiera</Text>
            <TextInput
              value={data.negocio}
              style={styles.text}
              placeholder={"Nombre"}
              placeholderTextColor="gray"
              onChangeText={(text) => {
                setData({ ...data, negocio: text });
              }}
            />
          </View>
          {/* ------------------ DIRECCIÓN ------------------*/}
          <View style={styles.containerText}>
            <Text style={styles.titleText}>Dirección</Text>
            <TextInput
              value={data.direccion}
              style={styles.text}
              placeholder={"Dirección"}
              placeholderTextColor="gray"
              onChangeText={(text) => {
                setData({ ...data, direccion: text });
              }}
            />
          </View>
          {/* ------------------ CELULAR ------------------*/}
          <View style={styles.containerText}>
            <Text style={styles.titleText}>Celular</Text>
            <TextInput
              value={data.celular}
              style={styles.text}
              placeholder={"Celular"}
              placeholderTextColor="gray"
              onChangeText={(text) => {
                setData({ ...data, celular: text });
              }}
              keyboardType="numeric"
            />
          </View>
          {/* ------------------ RECIBIR NOTIFICACIONES ------------------*/}
          {/* <View style={styles.containerConfiguration}>
            <View
              style={{
                height: 65,
                justifyContent: "center",
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Recibir Notificaciones
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Switch
                value={data.notification}
                onValueChange={(value) => {
                  // setAlert(value);
                  setData({ ...data, notification: value });
                }}
                trackColor={{ false: "grey", true: "rgb(63, 252, 236)" }}
                thumbColor={alert ? "rgb(63, 252, 236)" : "#f4f3f4"}
              />
              <Text
                style={{
                  color: "black",
                  paddingBottom: 10,
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                {alert ? "ON" : "OFF"}
              </Text>
            </View>
          </View> */}
          <Pressable style={styles.buttonContainer} onPress={handleDataKeep}>
            <Text style={styles.textGuardar}>Guardar</Text>
          </Pressable>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default InfNegocio;

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
//! cuando inicias los datos no se visualiza los datos guardados en el modal, y tampoco se actualiza cuando se guarda
