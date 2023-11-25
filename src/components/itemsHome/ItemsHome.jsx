import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const ItemsHome = () => {
  const navigation = useNavigation();

  const handlePrestamo = () => {
    navigation.navigate("Calculadora");
  };

  const handleCustomer = () => {
    navigation.navigate("Cliente");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={handleCustomer}>
        <Ionicons name="person" size={100} color="rgb(36, 224, 58)" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Ionicons name="cash" size={100} color="rgb(36, 224, 221)" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={handlePrestamo}>
        <Ionicons name="calculator" size={100} color="rgb(224, 205, 36)" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Ionicons name="calendar" size={100} color="rgb(224, 36, 186)" />
      </TouchableOpacity>
    </View>
  );
};

export default ItemsHome;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    paddingTop: 12,
    gap: 25,
    justifyContent: "center",
    alignContent: "center",
  },
  btn: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: "rgb(64, 67, 72)",
    justifyContent: "center",
    alignItems: "center",
  },
});
