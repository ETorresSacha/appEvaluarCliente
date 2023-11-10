import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Header from "../../components/header/Header";
import DataCustomer from "../../components/dataCustomer/DataCustomer";

const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <DataCustomer />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "red",
  },
  title: {
    fontSize: 16,
    paddingTop: 10,
  },
  content: {
    marginVertical: 16,
  },
});
