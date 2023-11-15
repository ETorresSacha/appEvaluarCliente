import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import Header from "../../components/header/Header";
import DataCustomer from "../../components/dataCustomer/DataCustomer";
import Prestamo from "../../components/prestamo/Prestamo";

const NewForm = () => {
  const [dataCuatomer, setDataCustomer] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    correo: "",
    direccion: "",
    celular: "",
  });
  return (
    <View style={styles.container}>
      <Header />
      <DataCustomer
        dataCuatomer={dataCuatomer}
        setDataCustomer={setDataCustomer}
      />
      <Prestamo />
      <View style={styles.buttonContainer}>
        <Button
          title="Guardar"
          // icon={<Icon name="add" color="#FFF" />}
          radius="lg"
          color="#4ecb71"
          //onPress={handleAddPress}
          // disabled={
          //   calories.trim() === "" ||
          //   name.trim() === "" ||
          //   portion.trim() === ""
          // }
        />
      </View>
    </View>
  );
};

export default NewForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    paddingTop: 300,
  },
});
