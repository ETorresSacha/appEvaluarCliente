import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, dataConfiguration, back, id, enable }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.conteiner}>
      <TouchableOpacity
        style={styles.leftConteiner}
        onPress={() =>
          id
            ? navigation.navigate("Detalle", {
                id: id,
                typeColor: null,
                enable: enable ? enable : null,
                dataConfiguration: dataConfiguration,
              })
            : navigation.navigate(back ? back : "Home")
        }
      >
        <AntDesign
          name="arrowleft"
          style={{ color: "cornsilk", fontSize: 40 }}
        />
      </TouchableOpacity>
      <View style={styles.rightConteiner}>
        <Text style={styles.subtitle}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  conteiner: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  rightConteiner: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
  },
  leftConteiner: {
    justifyContent: "center",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "cornsilk",
    fontWeight: "bold",
  },
});
