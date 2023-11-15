import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import Header from "../../components/header/Header";
import DataCustomer from "../../components/dataCustomer/DataCustomer";
import Prestamo from "../../components/prestamo/Prestamo";

const NewForm = () => {
  const [dataPerson, setDataPerson] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    correo: "",
    direccion: "",
    celular: "",
  });

  const [dataPrestamo, setDataPrestamo] = useState({
    capital: "",
    tiempo: "",
    interes: "",
    fecha: "",
    periodo: "",
  });
  const valor = dataPrestamo.capital;
  const result = parseInt(valor);
  const result2 = result / 2;
  console.log(valor);
  console.log(result);
  console.log(result2);
  return (
    <ScrollView style={styles.container}>
      <Header />
      <DataCustomer dataPerson={dataPerson} setDataPerson={setDataPerson} />
      <Prestamo dataPrestamo={dataPrestamo} setDataPrestamo={setDataPrestamo} />
      <View style={styles.buttonContainer}>
        <Button
          title="Guardar"
          // icon={<Icon name="add" color="#FFF" />}
          radius="lg"
          color="#4ecb71"
          //onPress={handleAddPress}
          disabled={
            dataPerson.nombre.trim() === "" || dataPrestamo.fecha.trim() === ""
          }
        />
      </View>
    </ScrollView>
  );
};

export default NewForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginVertical: 16,
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
