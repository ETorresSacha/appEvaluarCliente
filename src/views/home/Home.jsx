import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Header from "../../components/customerType/CustomerType";
import DataCustomer from "../../components/dataCustomer/DataCustomer";
import Gastos from "../../components/Gastos/Gastos";
import Ingresos from "../../components/ingresos/Ingresos";
import CustomerType from "../../components/customerType/CustomerType";

const Home = () => {
  return (
    <View style={styles.container}>
      <CustomerType />
      <DataCustomer />
      <Ingresos />
      <Gastos />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    paddingTop: 10,
  },
  content: {
    marginVertical: 16,
  },
});
