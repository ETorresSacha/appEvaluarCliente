import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Text } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import DataCustomer from "../../components/dataCustomer/DataCustomer";
import UseStorage from "../../components/hooks/UseHookStorage";
import Calculator from "../calculator/Calculator";

const NewForm = () => {
  const [visible, setVisible] = useState(false);
  const [valuePrest, setValuePrest] = useState(false);
  const [valuePerson, setValuePerson] = useState(false);
  const [resultPrestamo, setResulPrestamo] = useState({});

  const [dataPerson, setDataPerson] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    correo: "",
    direccion: "",
    celular: "",
  });

  // Valida los errores de todos los datos
  useEffect(() => {
    if (valuePrest && valuePerson) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [valuePrest, valuePerson]);

  // Guarda los datos en local storage
  const handleDataKeep = () => {
    if (valuePrest && valuePerson) {
      Alert.alert("Se guardo");
    } else {
      Alert.alert("No se guardo");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <DataCustomer
        setValuePerson={setValuePerson}
        dataPerson={dataPerson}
        setDataPerson={setDataPerson}
      />
      <Calculator
        setResulPrestamo={setResulPrestamo}
        valuePrest={valuePrest}
        setValuePrest={setValuePrest}
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
//! 1. TENEMOS QUE GUARDAR LOS RESULTADOS EN EL LOCAL STORAGE
//! 2. MOSTRAR LOS DATOS CORRECTOS EN EL CRONOGRAMA
//! 3. MOSTRAR LOS CLIENTES EN EL COMPONENTE CLIENTE
//! 4. TENEMOS QUE AÑADIR LAS OPCIONES DE EDITAR Y ELIMINAR CLIENTE

//! OTRO
//! 1. EN EL COMPONENTE CALCULADORA TENEMOS QUE AGREGAR LOS BOTONES DE AJUSTES EN DONDE TENEMOS QUE
//!    PONER UNA OPCION PARA CAMBIAR EL TASA DE DESGRAVAMEN MENSUAL, TAMBIEN EL BOTON DE LIMPIAR.
//! 2. MOSTRAR UN MEJOR DETALLADO DE LA CUOTA EN LA CALCULADORA
