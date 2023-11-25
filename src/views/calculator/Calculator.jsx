import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import Prestamo from "../../components/prestamo/Prestamo";
import DetailCalculator from "../../components/detailCalculator/DetailCalculator";
import { useFocusEffect } from "@react-navigation/native";
import { validationDataPrestamo } from "../../utils/validation/Validation";
import { resutCronograma } from "../../utils/calculoCuota/CalculosCuota";
import UseStorage from "../../components/hooks/UseHookStorage";
import Cuota from "../../components/cuota/Cuota";

const Calculator = ({ setResulPrestamo, valuePrest, setValuePrest }) => {
  const { onSaveCronograma } = UseStorage();
  const [resultCuota, setResultCuota] = useState();
  const [enabled, setEnabled] = useState(false);
  const [errorsPrestamo, setErrorsPrestamo] = useState({});
  const [dataPrestamo, setDataPrestamo] = useState({
    capital: "",
    nCuotas: "",
    tea: "",
    fechaDesembolso: "",
    fechaPrimeraCuota: "",
    periodo: "",
  });

  useEffect(() => {
    let resultVal = Object.values(errorsPrestamo);
    if (setValuePrest !== undefined) {
      if (resultVal.some((error) => error === "")) {
        setValuePrest(true);
      } else {
        setValuePrest(false);
      }
    } else {
      null;
    }

    if (valuePrest) {
      handleCalcular(dataPrestamo);
      //setResulPrestamo !== undefined ? setResulPrestamo(result) : null;
      //savePrestamo(result);
    }
  }, [setValuePrest, errorsPrestamo, errorsPrestamo.length, valuePrest]);

  useFocusEffect(
    React.useCallback(() => {
      setErrorsPrestamo(validationDataPrestamo(dataPrestamo));
      //return () => unsubscribe();
    }, [dataPrestamo])
  );

  const handleCalcular = async (data) => {
    //! OJO: FALTA CUADRAR BIEN LAS CUOTAS CON EL CRONOGRAMA REAL

    if (errorsPrestamo.incompletos === "") {
      const result = resutCronograma(data);
      setResultCuota(result);
      setEnabled(true);
      //setResulPrestamo(result);
      setResulPrestamo !== undefined ? setResulPrestamo(result) : null;
    } else {
      Alert.alert("Datos incompletos");
    }
  };

  return (
    <View style={styles.container}>
      <Prestamo
        dataPrestamo={dataPrestamo}
        setDataPrestamo={setDataPrestamo}
        setEnabled={setEnabled}
      />

      {/* ------------------ CALCULAR ------------------*/}
      {valuePrest !== undefined ? null : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.btnCalcular}
            onPress={() => handleCalcular(dataPrestamo)}
          >
            <Text style={styles.text}>Calcular</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* ------------------ RESULTADO ------------------*/}
      {valuePrest ? (
        enabled ? (
          <Cuota resultCuota={resultCuota} />
        ) : null
      ) : enabled ? (
        <DetailCalculator resultCuota={resultCuota} />
      ) : null}
    </View>
  );
};

export default Calculator;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  btnCalcular: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4ecb71",
    width: 200,
    height: 40,
    borderRadius: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
});
