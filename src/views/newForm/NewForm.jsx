import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import DataCustomer from "../../components/dataCustomer/DataCustomer";
import UseStorage from "../../components/hooks/UseHookStorage";
import Calculator from "../calculator/Calculator";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import { validationDataPerson } from "../../utils/validation/Validation";
import Header from "../../components/header/Header";

const NewForm = () => {
  const uuid = uuidv4();
  const navigation = useNavigation();
  const { onSaveCronograma } = UseStorage();

  const [errorsP, setErrorsP] = useState({});
  const [errores, setErrores] = useState({});
  const [clean, setClean] = useState(false);
  const [valuePrest, setValuePrest] = useState(false);
  const [dataPrestamo, setDataPrestamo] = useState({});
  const [valueError, setValueError] = useState(false);
  const [dataPerson, setDataPerson] = useState({
    uuid,
    nombre: "",
    apellido: "",
    dni: "",
    correo: "",
    direccion: "",
    celular: "",
    cancelled: false,
    // Datos del préstamo
    capital: "",
    cuotas: "",
    tea: "",
    fechaDesembolso: "",
    fechaPrimeraCuota: "",
    periodo: "",
    resultPrestamo: [],
  });

  useEffect(() => {
    // Limpia es estado
    if (clean) {
      setDataPerson({
        uuid,
        nombre: "",
        apellido: "",
        dni: "",
        correo: "",
        direccion: "",
        celular: "",
        cancelled: false,
        resultPrestamo: [],
      });
    }
  }, [clean]);

  const handleDataKeep = async () => {
    // Validación
    setValuePrest(true);
    setErrores(validationDataPerson(dataPerson));

    //Guardar datos
    let errorCustomer = validationDataPerson(dataPerson);
    let valuesErrorDataCustomer = Object.values(errorCustomer); // Errores del componente DataCuatomer
    let valuesErrorPrestamos = Object.values(errorsP); // Errores del componente Prestamo

    if (valuesErrorDataCustomer.some((error) => error !== "") || !valueError) {
      let typeError = valuesErrorDataCustomer.find((element) => element != ""); // Busca el tipo de error que existe en dataCustomer
      let typeError2 = valuesErrorPrestamos.find((element) => element != ""); // Busca el tipo de error que existe en Prestamo

      Alert.alert(typeError ? typeError : typeError2);
    } else {
      try {
        Alert.alert("GUARDAR", "¿Desea continuar?", [
          {
            text: "Si",
            onPress: async () => {
              await onSaveCronograma({
                uuid,
                nombre: dataPerson?.nombre,
                apellido: dataPerson?.apellido,
                dni: dataPerson?.dni,
                correo: dataPerson?.correo,
                direccion: dataPerson?.direccion,
                celular: dataPerson?.celular,
                cancelled: dataPerson?.cancelled,
                capital: dataPerson?.capital,
                cuotas: dataPerson?.cuotas,
                tea: dataPerson?.tea,
                fechaDesembolso: dataPerson?.fechaDesembolso,
                fechaPrimeraCuota: dataPerson?.fechaPrimeraCuota,
                periodo: dataPerson?.periodo,
                resultPrestamo: dataPerson.resultPrestamo,
              });

              Alert.alert(
                "Se guardo correctamente",
                "¿Desea agregar un nuevo cliente?",
                [
                  {
                    text: "Si",
                    onPress: () => {
                      setClean(true);
                      setValuePrest(false);
                    },
                    style: "destructive",
                  },
                  {
                    text: "No",
                    onPress: () => navigation.navigate("Clientes"),
                    style: "destructive",
                  },
                ]
              );
            },
            style: "destructive",
          },
          {
            text: "No",
            style: "destructive",
          },
        ]);
      } catch (error) {
        console.log(error);
        Alert.alert("Ocurrió un error");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header title={"Nuevo cliente"} back={"Clientes"} />
      <DataCustomer
        setErrores={setErrores}
        errores={errores}
        setDataPerson={setDataPerson}
        dataPerson={dataPerson}
      />
      <Calculator
        dataPrestamo={dataPrestamo}
        errorsP={errorsP}
        setErrorsP={setErrorsP}
        clean={clean}
        setClean={setClean}
        dataPerson={dataPerson}
        setDataPerson={setDataPerson}
        valuePrest={valuePrest}
        setValueError={setValueError}
        setValuePrest={setValuePrest}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleDataKeep}>
        <Text style={styles.text}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NewForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
    display: "flex",
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: "center",
    width: 250,
    height: 40,
    marginLeft: 80,
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#4ecb71",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

//! 4. TENEMOS QUE AÑADIR LAS OPCIONES DE EDITAR Y ELIMINAR CLIENTE
