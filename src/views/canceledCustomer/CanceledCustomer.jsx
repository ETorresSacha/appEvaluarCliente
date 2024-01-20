import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Header from "../../components/header/Header";
import NavBar from "../../components/navBar/NavBar";

const img =
  "https://i.pinimg.com/originals/fe/6f/35/fe6f35a1ceedf8421c5fd776390bee12.jpg";
const CanceledCustomer = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={[StyleSheet.absoluteFill]}></Image>
      <Header title={"Clientes Cancelados"} />
    </View>
  );
};

export default CanceledCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
  },
});
