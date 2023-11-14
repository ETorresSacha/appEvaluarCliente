import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Header from "../../components/header/Header";
import DataCustomer from "../../components/dataCustomer/DataCustomer";
import Prestamo from "../../components/prestamo/Prestamo";

const NewForm = () => {
  return (
    <View style={styles.container}>
      <Header />
      <DataCustomer />
      <Prestamo />
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
});
