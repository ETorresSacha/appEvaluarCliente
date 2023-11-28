import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Button, Icon, Input } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const NavBar = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const handleAddPress = () => {
    navigation.navigate("Nuevo cliente");
  };
  console.log(search);
  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          value={search}
          placeholder="Buscar"
          errorMessage="Error"
          defaultValue={search}
          onChangeText={(text) => {
            setSearch(text);
          }}
        />
        <View style={styles.icon}>
          <Ionicons
            onPress={() => Alert.alert("Cannot press this one")}
            name="search"
            size={25}
            color="black"
          />
        </View>
      </View>

      <Pressable style={styles.button} onPress={handleAddPress}>
        <Text style={styles.text}>Nuevo</Text>
      </Pressable>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 1,
    paddingVertical: 10,
    justifyContent: "space-evenly",
  },
  containerInput: {
    borderRadius: 10,
    display: "flex",
    paddingHorizontal: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "center",
  },
  button: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "orange",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: 15,
  },
  input: {
    paddingHorizontal: 5,
    height: 35,
    width: 200,
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  icon: {
    height: 35,
    width: 32,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
  inputDateContainer: {
    backgroundColor: "rgb(68, 132, 222)",
    //borderRadius: 10,

    alignItems: "center",
  },
});
