import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import Header from "../../components/header/Header";
import DataCustomer from "../../components/dataCustomer/DataCustomer";
import Prestamo from "../../components/prestamo/Prestamo";
import { validationDataPerson } from "../../utils/validation/Validation";

const NewForm = () => {
  const [errors, setErrors] = useState({});

  const [dataPerson, setDataPerson] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    correo: "",
    direccion: "",
    celular: "",
  });

  const handleAddPress = () => {
    setErrors(validationDataPerson(dataPerson));
    console.log(errors);
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Header /> */}
      <DataCustomer
        errors={errors}
        setErrors={setErrors}
        dataPerson={dataPerson}
        setDataPerson={setDataPerson}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Guardar"
          // icon={<Icon name="add" color="#FFF" />}
          radius="lg"
          color="#4ecb71"
          onPress={handleAddPress}
          // disabled={
          //   dataPerson.nombre.trim() === "" || dataPrestamo.fecha.trim() === ""
          //}
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
  },
  title: {
    fontSize: 16,
    paddingTop: 10,
  },
  content: {
    marginVertical: 16,
  },
  buttonContainer: {
    flex: 1,
  },
  content: {},
});

//! VALIDAR LOS DATOS DEL CLIENTE Y EL PRESTAMO
