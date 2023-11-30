import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Icon, Input } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const NavBar = ({ data, setData }) => {
  const navigation = useNavigation();
  const [textSearch, setText] = useState("");

  const handleAddPress = () => {
    navigation.navigate("Nuevo cliente");
  };

  // Busqueda por nombre y dni
  const handleSearch = (text) => {
    let busqueda = parseInt(text);

    // DNI
    if (busqueda / busqueda === 1) {
      let resulSearch = data.dataResultCopy.filter((element) =>
        element.dni.includes(text)
      );
      setData({ ...data, dataResult: resulSearch });
    }
    // NOMBRE
    else {
      let resulSearch = data.dataResultCopy.filter((element) =>
        element.nombre.includes(text)
      );
      setData({ ...data, dataResult: resulSearch });
    }
  };
  useEffect(() => {
    handleSearch(textSearch);
  }, [textSearch]);

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          value={textSearch}
          placeholder="Buscar"
          errorMessage="Error"
          defaultValue={textSearch}
          onChangeText={(text) => {
            setText(text);
          }}
        />
        <View style={styles.icon}>
          <Ionicons
            onPress={() => handleSearch(textSearch)}
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
    alignItems: "center",
  },
  containerInput: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    display: "flex",

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
    backgroundColor: "beige",
    paddingHorizontal: 5,
    height: 45,
    width: 240,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
  },
  icon: {
    backgroundColor: "beige",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    height: 45,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
  inputDateContainer: {
    backgroundColor: "rgb(68, 132, 222)",
    alignItems: "center",
  },
});
