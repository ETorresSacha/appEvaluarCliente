import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Text,
  Pressable,
} from "react-native";
import DataCustomer from "../../components/dataCustomer/DataCustomer";
import UseStorage from "../../components/hooks/UseHookStorage";
import Calculator from "../calculator/Calculator";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import { validationDataPerson } from "../../utils/validation/Validation";

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
    let valuesText = Object.values(errorCustomer);

    if (valuesText.some((error) => error !== "") || !valueError) {
      Alert.alert("Datos incompletos");
    } else {
      try {
        Alert.alert("GUARDAR", "¿Desea continuar?", [
          {
            text: "Si",
            onPress: async () => {
              await onSaveCronograma({
                uuid,
                nombre: dataPerson.nombre,
                apellido: dataPerson.apellido,
                dni: dataPerson.dni,
                correo: dataPerson.correo,
                direccion: dataPerson.direccion,
                celular: dataPerson.celular,
                cancelled: dataPerson.cancelled,
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
                    onPress: () => navigation.navigate("Cliente"),
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
      <Pressable style={styles.buttonContainer} onPress={handleDataKeep}>
        <Text style={styles.text}>Guardar</Text>
      </Pressable>
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
// DESPUES ESTO

//! 4. TENEMOS QUE AÑADIR LAS OPCIONES DE EDITAR Y ELIMINAR CLIENTE

//! OTRO
//! 1. EN EL COMPONENTE CALCULADORA TENEMOS QUE AGREGAR LOS BOTONES DE AJUSTES EN DONDE TENEMOS QUE
//!    PONER UNA OPCION PARA CAMBIAR EL TASA DE DESGRAVAMEN MENSUAL, TAMBIEN EL BOTON DE LIMPIAR.
//! 2. MOSTRAR UN MEJOR DETALLADO DE LA CUOTA EN LA CALCULADORA
