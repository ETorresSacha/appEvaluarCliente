import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
const user = {
  name: "Erik Torres Sacha",
  uri: "https://media.licdn.com/dms/image/D4E03AQH-M4FFjGHveA/profile-displayphoto-shrink_400_400/0/1693329901508?e=1704931200&v=beta&t=07dlpl6eAU2K3xnJx0oL0-v76Br4jWK0Acj9BXkgCfc",
};
const Header = () => {
  return (
    <View style={styles.conteiner}>
      <View style={styles.leftConteiner}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.subtitle}>Bienvenido</Text>
      </View>
      <View style={styles.rightConteiner}>
        <Image source={{ uri: user.uri }} style={styles.profileImage}></Image>
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  conteiner: {
    flexDirection: "row",
  },
  leftConteiner: {
    flex: 1,
    justifyContent: "center",
  },
  rightConteiner: {
    flex: 1,
    alignItems: "flex-end",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "#808080",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 24,
  },
});
