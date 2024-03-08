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
import React, { useEffect, useState } from "react";
import { TEM } from "../../../utils/calculoCuota/Formulas";
import { validationConfiguration } from "../../../utils/validation/Validation";
import UseStorageConfiguration from "../../../components/hooks/UseHookTasaPrimaMensual";

const Configuration = ({ enablerConf, setEnableConf }) => {
  const { onSaveDataConfiguration, onGetConfiguration } =
    UseStorageConfiguration();
  const [data, setData] = useState({
    tpm: "",
    ccv: "",
    intMoratorio: "",
  });

  // Cargar los datos de la configuración

  const loadCongiguration = async () => {
    try {
      let result = await onGetConfiguration();
      result = result == undefined ? data : result;
      console.log(result);

      setData({
        ...data,
        tpm: result[0]?.tpm,
        ccv: result[0]?.ccv,
        intMoratorio: result[0]?.intMoratorio,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCongiguration();
  }, []);
  const handleKeep = async (value) => {
    // Validando
    let error = validationConfiguration(value);
    let valuesError = Object.values(error);
    console.log(valuesError);
    if (valuesError.some((error) => error != "")) {
      let typeError = valuesError.find((element) => element != ""); // Busca el tipo de error que existe
      Alert.alert(typeError);
    } else {
      await onSaveDataConfiguration(data);
      setEnableConf(false);
    }
  };
  return (
    <Modal
      style={styles.container}
      transparent={true}
      visible={enablerConf}
      onRequestClose={() => setEnableConf(false)}
    >
      <TouchableWithoutFeedback onPress={() => setEnableConf(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <View>
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
        </View>
        <View>
          <Text style={{ paddingBottom: 10 }}>
            Estos datos son útiles para los cálculos del crédito y sólo serán
            modificados desde esta vista.
          </Text>
        </View>

        {/* Tasa Prima Mensual */}
        <View style={styles.containerInput}>
          <Text>Tasa Prima Mensual</Text>
          <View style={styles.inputView}>
            <TextInput
              value={data.tpm}
              style={styles.input}
              placeholderTextColor="gray"
              onChangeText={(text) => {
                setData({ ...data, tpm: text });
              }}
              keyboardType="numeric"
            />
            <Text style={{ fontSize: 20 }}>%</Text>
          </View>
        </View>
        <View style={{ paddingTop: 30 }}>
          <Text style={{ color: "gray" }}>
            Aplicable solo cuando existe mora
          </Text>
        </View>

        {/* Interés Moratorio Anual */}
        <View style={styles.containerInput}>
          <Text>Interés Moratorio Anual</Text>
          <View style={styles.inputView}>
            <TextInput
              value={data.intMoratorio}
              style={styles.input}
              placeholderTextColor="gray"
              onChangeText={(text) => {
                setData({ ...data, intMoratorio: text });
              }}
              keyboardType="numeric"
            />
            <Text style={{ fontSize: 20 }}>%</Text>
          </View>
        </View>

        {/* Comisión de Cobranza Variable */}
        <View style={styles.containerInput}>
          <Text>Comisión de Cobranza Variable</Text>
          <View style={styles.inputView}>
            <TextInput
              value={data.ccv}
              style={styles.input}
              placeholderTextColor="gray"
              onChangeText={(text) => {
                setData({ ...data, ccv: text });
              }}
              keyboardType="numeric"
            />
            <Text style={{ fontSize: 20 }}>%</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.btnCalcular}
            onPress={() => handleKeep(data)}
          >
            <Text style={styles.textBtn}>Guardar</Text>
          </TouchableOpacity>
        </View>
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
  containerInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  inputView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 5,
    alignItems: "flex-end",
  },
  input: {
    alignItems: "center",
    textAlign: "center",
    color: "black",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 60,
    fontSize: 17,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingTop: 30,
  },
  btnCalcular: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4ecb71",
    width: 300,
    height: 40,
    borderRadius: 15,
  },
  textBtn: {
    fontSize: 19,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
});
