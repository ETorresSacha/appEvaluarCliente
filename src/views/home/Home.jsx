import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import DataCustomer from "../../components/dataCustomer/DataCustomer";
import Gastos from "../../components/Gastos/Gastos";
import Ingresos from "../../components/ingresos/Ingresos";
import CustomerType from "../../components/customerType/CustomerType";
import Header from "../../components/header/Header";
import ItemsHome from "../../components/itemsHome/ItemsHome";

const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <CustomerType />
      {/* <Ingresos />
      <Gastos /> */}
      <ItemsHome />
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
