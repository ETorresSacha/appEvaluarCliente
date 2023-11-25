import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Text } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import DataCustomer from "../../components/dataCustomer/DataCustomer";
import Credit from "../credit/Credit";
import UseStorage from "../../components/hooks/UseHookStorage";
import Calculator from "../calculator/Calculator";

const NewForm = () => {
  const { onGetCronograma } = UseStorage();

  const [valuePrest, setValuePrest] = useState(false);
  const [valuePerson, setValuePerson] = useState(false);
  const [resultPrestamo, setResulPrestamo] = useState({});

  const [visible, setVisible] = useState(false);

  const [dataPerson, setDataPerson] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    correo: "",
    direccion: "",
    celular: "",
  });
  // console.log(Cuota);
  // TRAER LOS DATOS DEL PRESTAMO
  const loadPrestamo = async () => {
    // Trae los datos guardados del local storage
    try {
      const resultPrestamo = await onGetCronograma();
      setResulPrestamo(resultPrestamo);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (valuePrest && valuePerson) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    //loadPrestamo();
  }, [valuePrest, valuePerson]);

  const handleDataKeep = () => {
    console.log();
    if (valuePrest && valuePerson) {
      Alert.alert("Se guardo");
    } else {
      Alert.alert("No se guardo");
    }
  };

  console.log(resultPrestamo);
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

//! GUARDAR LOS DATOS EN STORAGE generando un id
//! EN LA VISTA DE LOS CLIENTES TIENE QUE IR EL DNI, NOMBRE, FECHA DE PAGO, CUOTA, BOTON DE EDITAR Y ELIMINAR
