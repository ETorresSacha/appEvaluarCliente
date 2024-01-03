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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
      <TouchableOpacity onPress={handleCustomer} style={styles.item}>
        <FontAwesome name="users" size={100} color="rgb(36, 224, 58)" />
        <Text style={styles.text}> Clientes Pendientes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons
          name="account-cancel"
          size={100}
          color="rgb(36, 224, 221)"
        />
        <Text style={styles.text}> Clientes Cancelados</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePrestamo} style={styles.item}>
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
    width: 330,
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
    marginTop: 120,
    marginLeft: 30,
    borderRadius: 20,
    gap: 30,
  },

  text: {
    fontWeight: "bold",
    color: "cornsilk",
    textAlign: "center",
    width: "90%",
  },
  item: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  blur: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
