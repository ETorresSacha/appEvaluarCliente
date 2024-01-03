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
import { BlurView } from "expo-blur";

const ItemsHome = () => {
  const navigation = useNavigation();

  const handlePrestamo = () => {
    navigation.navigate("Calculadora");
  };

  const handleCustomer = () => {
    navigation.navigate("Clientes");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCustomer}>
        <Ionicons name="users" size={100} color="rgb(36, 224, 58)" />
        <Text style={styles.text}> Clientes</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name="cash" size={100} color="rgb(36, 224, 221)" />
        <Text style={styles.text}> Cancelado</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePrestamo}>
        <Ionicons name="calculator" size={100} color="rgb(224, 205, 36)" />
        <Text style={styles.text}> Calculadora</Text>
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
    paddingTop: 50,
    gap: 25,
    justifyContent: "center",
    alignContent: "center",
  },
  btn: {
    width: 120,
    height: 120,
    borderRadius: 150,
    //backgroundColor: "rgb(64, 67, 72)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    color: "cornsilk",
    textAlign: "center",
  },
});
