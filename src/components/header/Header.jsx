import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, back }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.conteiner}>
      <TouchableOpacity
        style={styles.leftConteiner}
        onPress={() => navigation.navigate(!back ? "Home" : back)}
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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 24,
  },
});
