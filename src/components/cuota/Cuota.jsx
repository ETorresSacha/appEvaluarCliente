import React from "react";
import { View, StyleSheet, Alert, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Cuota = ({ dataPerson }) => {
  const navigation = useNavigation();
  const cuota = dataPerson.resultPrestamo[0]?.montoCuota;

  const handleRouteCronograma = () => {
    navigation.navigate("Cronograma", { id: dataPerson.uuid });
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable
          style={styles.button}
          onPress={() => Alert.alert("Cannot press this one")}
        >
          <Text style={styles.text}>{cuota}</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          style={styles.buttonCronograma}
          onPress={handleRouteCronograma}
        >
          <Text style={styles.textCronograma}>Cronograma</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Cuota;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  button: {
    alignItems: "center",
    width: 120,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "orange",
  },
  buttonCronograma: {
    alignItems: "center",
    width: 150,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "orange",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },

  textCronograma: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
});
