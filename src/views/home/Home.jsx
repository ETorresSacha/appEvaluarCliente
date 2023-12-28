import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";
import CustomerType from "../../components/customerType/CustomerType";
import Header from "../../components/header/Header";
import ItemsHome from "../../components/itemsHome/ItemsHome";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalConfigNotification from "../../modals/modalConfigNotification/ModalConfigNotification";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Cerrar el modal
  const handleModalClose = async (shouldUpdate) => {
    if (shouldUpdate) {
      Alert.alert("Se guardó correctamente");
    }
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header />

      <View>
        <View style={styles.institutionTitle}>
          <Text style={styles.title}>INSTITUCIÓN</Text>
          <Pressable onPress={() => setIsVisible(true)}>
            <FontAwesome name="gear" size={30} style={{ color: "cornsilk" }} />
          </Pressable>
        </View>
        <View style={styles.containerSwitch}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.subTitle}>Institución: </Text>
            <Text style={styles.subTitle}>Anónimo</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <MaterialCommunityIcons
              name="lightbulb-on"
              style={{ color: "yellow", fontSize: 30 }}
            />
            <Text style={styles.subTitle}>activo</Text>
          </View>
        </View>
      </View>
      <ModalConfigNotification visible={isVisible} onClose={handleModalClose} />
      <ItemsHome />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "rgb(31, 36, 36)",
  },
  title: {
    paddingVertical: 10,
    color: "cornsilk",
    fontSize: 17,
    fontWeight: "bold",
  },
  content: {
    marginVertical: 16,
  },
  institutionTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    paddingHorizontal: 15,
  },
  containerSwitch: {
    //flex: 1,
    display: "flex",
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    //backgroundColor: "red",
  },
  subTitle: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    //backgroundColor: "green",
  },
});
