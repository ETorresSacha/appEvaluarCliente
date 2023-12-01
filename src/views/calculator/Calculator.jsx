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
  setDataPrestamo,
  errorsP,
  setErrorsP,
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
  const [prestamo, setPrestamo] = useState({
    capital: "",
    cuotas: "",
    tea: "",
    fechaDesembolso: "",
    fechaPrimeraCuota: "",
    periodo: "",
  });
  //console.log(prestamo);
  // Valida los errores

  //console.log(errorsPrestamo);
  useFocusEffect(
    React.useCallback(() => {
      //setErrorsPrestamo(validationDataPrestamo(prestamo));
      //setErrorsPrestamo(validationDataPrestamo(prestamo));
      // setErrorsP !== undefined
      //   ? setErrorsP(validationDataPrestamo(prestamo))
      //   : null;
      //return () => unsubscribe();
      //
      if (valuePrest) {
        setErrorsPrestamo(validationDataPrestamo(prestamo));
      }
    }, [valuePrest])
  );
  useEffect(() => {
    if (errorsP !== undefined) {
      let resulView = false;
      //if (valuePrest) {
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

      //! falta mostrar la cuota
      //else {
      //       setValuePrest(false);
      //       setEnabled(false);
      //     }
      //   } else {
      //     null;
      //   }
      //setErrorsPrestamo(validationDataPrestamo(prestamo));
      // }
      // setErrorsP(errorsPrestamo);
      // setDataPrestamo(prestamo);
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
    //   else {
    //     null;
    //   }
    // } else {
    //   null;
  }, [clean]);

  // useEffect(() => {
  //   // Valida los errores
  //   let resultVal = Object.values(errorsPrestamo);
  //   if (setValuePrest !== undefined) {
  //     if (resultVal.some((error) => error === "")) {
  //       setValuePrest(true);
  //     } else {
  //       setValuePrest(false);
  //       setEnabled(false);
  //     }
  //   } else {
  //     null;
  //   }

  //   // Si es TRUE calcula el préstamo
  //   if (valuePrest) {
  //     handleCalcular(prestamo);
  //   }

  //   // Sirve para que no sea visible el resultado cuando se borra algún
  //   // dato de la vista de la calculadora
  //   if (errorsPrestamo.incompletos !== "") {
  //     setEnabled(false);
  //   }
  // }, [setValuePrest, errorsPrestamo, errorsPrestamo.length, valuePrest]);
  //console.log(errorsPrestamo);
  const handleCalcular = async (data) => {
    //! OJO: FALTA CUADRAR BIEN LAS CUOTAS CON EL CRONOGRAMA REAL
    setErrorsPrestamo(validationDataPrestamo(data));
    let resultError = validationDataPrestamo(data);

    let valuesText = Object.values(resultError); // verificamos si los valores de los errores si existen y se guarda
    //console.log(valuesText);
    if (valuesText.some((error) => error !== "")) {
      Alert.alert("Datos incompletos");
    } else {
      const result = resutCronograma(data);
      dataPerson !== undefined
        ? setDataPerson({ ...dataPerson, resultPrestamo: result })
        : setResultCuota(result);

      setEnabled(true); // esta para ver
    }

    // if (errorsPrestamo.incompletos === "") {
    //   const result = resutCronograma(data);
    //   setResultCuota(result);
    //   setEnabled(true);
    //   setDataPerson !== undefined
    //     ? setDataPerson({ ...dataPerson, resultPrestamo: result })
    //     : null;
    // } else {
    //   setDataPerson !== undefined ? null : Alert.alert("Datos incompletos");
    // }
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
    //backgroundColor: "red",
    //marginTop: 10,
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

//! falta completar la linea roja a todos los demas y tambien validar y calcular la cuota
