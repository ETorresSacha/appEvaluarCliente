import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import Prestamo from "../../components/prestamo/Prestamo";
import DetailCalculator from "../../components/detailCalculator/DetailCalculator";
import { useFocusEffect } from "@react-navigation/native";
import { validationDataPrestamo } from "../../utils/validation/Validation";
import { resutCronograma } from "../../utils/calculoCuota/CalculosCuota";
import Cuota from "../../components/cuota/Cuota";

const Calculator = ({
  dataPrestamo,
  errorsP,
  setErrorsP,
  clean,
  setClean,
  dataPerson,
  setDataPerson,
  valuePrest,
}) => {
  const [resultCuota, setResultCuota] = useState(); // Útil para la vista de la calculadora
  const [enabled, setEnabled] = useState(false);
  const [errorsPrestamo, setErrorsPrestamo] = useState({});
  const [prestamo, setPrestamo] = useState({
    capital: "",
    cuotas: "",
    tea: "",
    fechaDesembolso: "",
    fechaPrimeraCuota: "",
    periodo: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      // Valida los datos-componente NEWFORM
      if (valuePrest) {
        setErrorsPrestamo(validationDataPrestamo(prestamo));
      }
    }, [valuePrest])
  );

  useEffect(() => {
    if (errorsP !== undefined) {
      let resulView = false;

      setErrorsP(validationDataPrestamo(prestamo));

      let resultError = validationDataPrestamo(prestamo);
      let resultVal = Object.values(resultError);

      if (resultVal.some((error) => error !== "")) {
        resulView = false;
      } else {
        resulView = true;
      }
      if (resulView) {
        handleCalcular(prestamo);
      }
    }
  }, [prestamo]);

  useEffect(() => {
    if (clean !== undefined) {
      //Limpia el estado
      if (clean) {
        setPrestamo({
          capital: "",
          nCuotas: "",
          tea: "",
          fechaDesembolso: "",
          fechaPrimeraCuota: "",
          periodo: "",
        });
        setClean(false);
        setEnabled(false);
      }
    }
  }, [clean]);

  const handleCalcular = async (data) => {
    //! OJO: FALTA CUADRAR BIEN LAS CUOTAS CON EL CRONOGRAMA REAL
    // Valida
    setErrorsPrestamo(validationDataPrestamo(data));
    let resultError = validationDataPrestamo(data);

    // Calcula la cuota
    let valuesText = Object.values(resultError);

    if (valuesText.some((error) => error !== "")) {
      Alert.alert("Datos incompletos");
    } else {
      const result = resutCronograma(data);
      dataPerson !== undefined
        ? setDataPerson({ ...dataPerson, resultPrestamo: result })
        : setResultCuota(result);
      setEnabled(true);
    }
  };

  return (
    <View style={styles.container}>
      <Prestamo
        errorsPrestamo={errorsPrestamo}
        setErrorsPrestamo={setErrorsPrestamo}
        errorsP={errorsP}
        setErrorsP={setErrorsP}
        prestamo={prestamo}
        setPrestamo={setPrestamo}
        enabled={enabled}
      />
      <ScrollView>
        {/* ------------------ CALCULAR ------------------*/}
        {dataPrestamo !== undefined ? null : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.btnCalcular}
              onPress={() => handleCalcular(prestamo)}
            >
              <Text style={styles.text}>Calcular</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* ------------------ RESULTADO ------------------*/}
        {dataPrestamo !== undefined ? (
          dataPrestamo ? (
            enabled ? (
              <Cuota dataPerson={dataPerson} />
            ) : null
          ) : null
        ) : enabled ? (
          <DetailCalculator resultCuota={resultCuota} />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default Calculator;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
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
