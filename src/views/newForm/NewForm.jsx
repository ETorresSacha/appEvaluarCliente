import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Text } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import DataCustomer from "../../components/dataCustomer/DataCustomer";
import UseStorage from "../../components/hooks/UseHookStorage";
import Calculator from "../calculator/Calculator";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";

const NewForm = () => {
  const uuid = uuidv4();
  const navigation = useNavigation();
  const { onSaveCronograma } = UseStorage();

  const [visible, setVisible] = useState(false);
  const [clean, setClean] = useState(false);
  const [valuePrest, setValuePrest] = useState(false);
  const [valuePerson, setValuePerson] = useState(false);

  const [dataPerson, setDataPerson] = useState({
    uuid,
    nombre: "",
    apellido: "",
    dni: "",
    correo: "",
    direccion: "",
    celular: "",
    resultPrestamo: {},
  });

  // Valida los errores de todos los datos
  useEffect(() => {
    if (clean) {
      setDataPerson({
        uuid,
        nombre: "",
        apellido: "",
        dni: "",
        correo: "",
        direccion: "",
        celular: "",
        resultPrestamo: {},
      });
    }
    if (valuePrest && valuePerson) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [clean, valuePrest, valuePerson]);

  // Guarda los datos en local storage
  const handleDataKeep = async () => {
    if (valuePrest && valuePerson) {
      try {
        await onSaveCronograma({
          uuid,
          nombre: dataPerson.nombre,
          apellido: dataPerson.apellido,
          dni: dataPerson.dni,
          correo: dataPerson.correo,
          direccion: dataPerson.direccion,
          celular: dataPerson.celular,
          resultPrestamo: dataPerson.resultPrestamo,
        });
        Alert.alert(
          "Se guardo correctamente",
          "¿Desea agregar un nuevo cliente?",
          [
            {
              text: "Si",
              onPress: () => setClean(true),
              style: "destructive",
            },
            {
              text: "No",
              onPress: () => navigation.navigate("Cliente"),
              style: "destructive",
            },
          ]
        );
        setVisible(false);
      } catch (error) {
        console.log(error);
        Alert.alert("No se guardo este dato");
      }
    } else {
      Alert.alert("No se guardo");
    }
  };
  return (
    <ScrollView style={styles.container}>
      <DataCustomer
        setValuePerson={setValuePerson}
        setDataPerson={setDataPerson}
        dataPerson={dataPerson}
      />
      <Calculator
        clean={clean}
        setClean={setClean}
        setDataPerson={setDataPerson}
        dataPerson={dataPerson}
        setValuePrest={setValuePrest}
        valuePrest={valuePrest}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Guardar"
          icon={<Icon name="add" color="#FFF" />}
          radius="lg"
          color="#4ecb71"
          onPress={handleDataKeep}
          disabled={!visible}
        />
      </View>
    </ScrollView>
  );
};

export default NewForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "pink",
  },
  title: {
    fontSize: 16,
    paddingTop: 10,
  },
  buttonContainer: {
    flex: 1,
    paddingTop: 15,
  },
});
// DESPUES ESTO

//! 4. TENEMOS QUE AÑADIR LAS OPCIONES DE EDITAR Y ELIMINAR CLIENTE

//! OTRO
//! 1. EN EL COMPONENTE CALCULADORA TENEMOS QUE AGREGAR LOS BOTONES DE AJUSTES EN DONDE TENEMOS QUE
//!    PONER UNA OPCION PARA CAMBIAR EL TASA DE DESGRAVAMEN MENSUAL, TAMBIEN EL BOTON DE LIMPIAR.
//! 2. MOSTRAR UN MEJOR DETALLADO DE LA CUOTA EN LA CALCULADORA
