import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Prestamo from "../../components/prestamo/Prestamo";
import DetailCalculator from "../../components/detailCalculator/DetailCalculator";
import { useFocusEffect } from "@react-navigation/native";
import { validationDataPrestamo } from "../../utils/validation/Validation";
import { resutCronograma } from "../../utils/calculoCuota/CalculosCuota";
import Cuota from "../../components/cuota/Cuota";

const Calculator = ({
  clean,
  setClean,
  dataPerson,
  setDataPerson,
  valuePrest,
  setValuePrest,
}) => {
  const [resultCuota, setResultCuota] = useState(); // Útil para la vista de la calculadora
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

  // Valida los errores
  useFocusEffect(
    React.useCallback(() => {
      setErrorsPrestamo(validationDataPrestamo(dataPrestamo));

      //return () => unsubscribe();
    }, [dataPrestamo])
  );

  useEffect(() => {
    if (clean !== undefined) {
      //Limpia el estado
      if (clean) {
        setDataPrestamo({
          capital: "",
          nCuotas: "",
          tea: "",
          fechaDesembolso: "",
          fechaPrimeraCuota: "",
          periodo: "",
        });
        setClean(false);
      } else {
        null;
      }
    } else {
      null;
    }
  }, [clean]);

  useEffect(() => {
    // Valida los errores
    let resultVal = Object.values(errorsPrestamo);
    if (setValuePrest !== undefined) {
      if (resultVal.some((error) => error === "")) {
        setValuePrest(true);
      } else {
        setValuePrest(false);
        setEnabled(false);
      }
    } else {
      null;
    }

    // Si es TRUE calcula el préstamo
    if (valuePrest) {
      handleCalcular(dataPrestamo);
    }

    // Sirve para que no sea visible el resultado cuando se borra algún
    // dato de la vista de la calculadora
    if (errorsPrestamo.incompletos !== "") {
      setEnabled(false);
    }
  }, [setValuePrest, errorsPrestamo, errorsPrestamo.length, valuePrest]);

  const handleCalcular = async (data) => {
    //! OJO: FALTA CUADRAR BIEN LAS CUOTAS CON EL CRONOGRAMA REAL

    if (errorsPrestamo.incompletos === "") {
      const result = resutCronograma(data);
      setResultCuota(result);
      setEnabled(true);
      setDataPerson !== undefined
        ? setDataPerson({ ...dataPerson, resultPrestamo: result })
        : null;
    } else {
      setDataPerson !== undefined ? null : Alert.alert("Datos incompletos");
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
      {valuePrest !== undefined ? (
        valuePrest ? (
          enabled ? (
            <Cuota dataPerson={dataPerson} />
          ) : null
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
  containerResult: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  resultCuota: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "orange",
  },
});
