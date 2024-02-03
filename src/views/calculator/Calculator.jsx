import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import Prestamo from "../../components/prestamo/Prestamo";
import DetailCalculator from "../../components/detailCalculator/DetailCalculator";
import { useFocusEffect } from "@react-navigation/native";
import { validationDataPrestamo } from "../../utils/validation/Validation";
import { resutCronograma } from "../../utils/calculoCuota/CalculosCuota";
import Cuota from "../../components/cuota/Cuota";
import Header from "../../components/header/Header";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ModalCofigPrestamo from "../../modals/modalCofigPrestamo/ModalCofigPrestamo";

const img =
  "https://i.pinimg.com/originals/fe/6f/35/fe6f35a1ceedf8421c5fd776390bee12.jpg";
const Calculator = ({
  dataPrestamo,
  errorsP,
  setErrorsP,
  clean,
  setClean,
  dataPerson,
  setDataPerson,
  valuePrest,
  setValueError,
  setValuePrest,
}) => {
  const [isVisible, setIsVisible] = useState(false);
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

  // Todo--> COMPONENTE NEWFORM
  useFocusEffect(
    React.useCallback(() => {
      // Valida los datos al inicio-componente NEWFORM
      if (valuePrest) {
        setErrorsPrestamo(validationDataPrestamo(prestamo));
      }
    }, [valuePrest, setValueError])
  );

  // Valida los datos y calcula la cuota del componente NEWFORM
  useEffect(() => {
    if (errorsP !== undefined) {
      let resulView = false;

      setErrorsP(validationDataPrestamo(prestamo));

      let resultError = validationDataPrestamo(prestamo);
      let resultVal = Object.values(resultError);

      if (resultVal.some((error) => error !== "")) {
        resulView = false;
        setEnabled(false);
        setValueError(false);
        setValuePrest(false);
      } else {
        resulView = true;
        setEnabled(true);
        setValueError(true);
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
          cuotas: "",
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

  // Todo--> COMPONENTE CALCULATOR
  useEffect(() => {
    if (dataPrestamo == undefined) {
      let resultError = validationDataPrestamo(prestamo);
      let valuesText = Object.values(resultError);
      if (enabled == true && valuesText.some((error) => error !== "")) {
        setEnabled(false);
      }
    }
  }, [prestamo]);

  // Todo--> PARA AMBOS COMPONENTES
  const handleCalcular = async (data) => {
    //! OJO: FALTA CUADRAR BIEN LAS CUOTAS CON EL CRONOGRAMA REAL
    // Valida
    setErrorsPrestamo(validationDataPrestamo(data));
    let resultError = validationDataPrestamo(data);

    // Calcula la cuota
    let valuesText = Object.values(resultError);

    if (valuesText.some((error) => error !== "")) {
      setEnabled(false);
      Alert.alert("Datos incompletos");
    } else {
      const result = resutCronograma(data);
      dataPerson !== undefined
        ? setDataPerson({
            ...dataPerson,
            capital: prestamo?.capital,
            cuotas: prestamo?.cuotas,
            tea: prestamo?.tea,
            fechaDesembolso: prestamo?.fechaDesembolso,
            fechaPrimeraCuota: prestamo?.fechaPrimeraCuota,
            periodo: prestamo?.periodo,
            resultPrestamo: result,
          })
        : setResultCuota(result);
      setEnabled(true);
    }
  };

  // Cerrar el modal
  //! este handle tenemos que verificar que cierre correctamente mandando una alerta para decidir
  const handleModalClose = async (shouldUpdate) => {
    if (shouldUpdate) {
      Alert.alert("Se guardó correctamente");
    }
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      {errorsP == undefined ? (
        <Image source={{ uri: img }} style={[StyleSheet.absoluteFill]}></Image>
      ) : null}
      {errorsP == undefined ? <Header title={"Evaluar"} back={"Home"} /> : null}
      <View style={styles.titleEvaluar}>
        <Text style={styles.title}>PRESTAMO</Text>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <FontAwesome name="cog" size={32} style={{ color: "cornsilk" }} />
        </TouchableOpacity>
      </View>

      {/* -- CONFIGURACIÓN DEL MODAL (TASA PRIMA MENSUAL) --*/}
      <ModalCofigPrestamo
        handleModalClose={handleModalClose}
        isVisible={isVisible}
      />

      <ScrollView>
        <Prestamo
          errorsPrestamo={errorsPrestamo}
          setErrorsPrestamo={setErrorsPrestamo}
          errorsP={errorsP}
          setErrorsP={setErrorsP}
          prestamo={prestamo}
          setPrestamo={setPrestamo}
        />
        <View>
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
        </View>
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
  text: {
    fontSize: 22,
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
  titleEvaluar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 7,
    backgroundColor: "rgba(36, 146, 224, 0.625)",
  },
  title: {
    fontSize: 17,
    color: "white",
    paddingVertical: 5,
    fontWeight: "bold",
  },
});

//! falta el modal para configurar el tipo de prestamo( mensual, trimestral,etc), el ITF "lo mas importante"
