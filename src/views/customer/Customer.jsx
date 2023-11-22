import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const Customer = () => {
  const navigation = useNavigation();
  const handleAddPress = () => {
    navigation.navigate("Nuevo cliente");
  };

  return (
    <View style={styles.container}>
      <Text>clientes</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Nuevo"
          icon={<Icon name="add" color="#FFF" />}
          radius="lg"
          color="#4ecb71"
          onPress={handleAddPress}
        />
      </View>
    </View>
  );
};

export default Customer;
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
//! TENEMOS QUE CREAR UN BOTON PARA REDIRIGIR AL COMPONENTE NEWFORM, Y HACER LA FUNCIONALIDAD PARA
//! CREAR CLIENTE Y PROGRAMA, SOLO SI SERA UN NUEVO CLIENTE,

//! EN ESTE COMPONENTE REDERIZAREMOS A LOS CLIENTE Y LA ALERTA DE PAGO
