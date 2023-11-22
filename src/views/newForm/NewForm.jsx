import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";

import DataCustomer from "../../components/dataCustomer/DataCustomer";

import { validationDataPerson } from "../../utils/validation/Validation";
import Prestamo from "../../components/prestamo/Prestamo";
import Credit from "../credit/Credit";

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
  };

  return (
    <ScrollView style={styles.container}>
      <DataCustomer
        errors={errors}
        setErrors={setErrors}
        dataPerson={dataPerson}
        setDataPerson={setDataPerson}
      />
      <Credit />

      <View style={styles.buttonContainer}>
        <Button
          title="Guardar"
          icon={<Icon name="add" color="#FFF" />}
          radius="lg"
          color="#4ecb71"
          onPress={handleAddPress}
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

//! VALIDAR LOS DATOS DEL CLIENTE Y EL PRESTAMO
