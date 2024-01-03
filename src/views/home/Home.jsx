import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Image,
} from "react-native";
import CustomerType from "../../components/customerType/CustomerType";
import Header from "../../components/header/Header";
import ItemsHome from "../../components/itemsHome/ItemsHome";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//import ModalConfigNotification from "../../modals/modalConfigNotification/ModalConfigNotification";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import ModalConfigPersonal from "../../modals/modalConfigPersonal/ModalConfigPersonal";

const user = {
  name: "Erik Torres Sacha",
  uri: "https://media.licdn.com/dms/image/D4E03AQH-M4FFjGHveA/profile-displayphoto-shrink_400_400/0/1693329901508?e=1704931200&v=beta&t=07dlpl6eAU2K3xnJx0oL0-v76Br4jWK0Acj9BXkgCfc",
};

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Cerrar el modal
  const handleModalClose = async (shouldUpdate) => {
    if (shouldUpdate) {
      Alert.alert("Se guardó correctamente");
    }
    setIsVisible(false);
  };

  //!!!!!!!!!!!!!!!!!!!

  return (
    <View style={styles.container}>
      <View style={styles.conteinerHeader}>
        <View style={styles.rightConteiner}>
          <Image source={{ uri: user.uri }} style={styles.profileImage}></Image>
        </View>
        <Pressable
          style={styles.leftConteiner}
          onPress={() => setIsVisible(true)}
        >
          <SimpleLineIcons
            name="options-vertical"
            style={{ color: "cornsilk", fontSize: 25 }}
          />
        </Pressable>
      </View>
      <ModalConfigPersonal visible={isVisible} onClose={handleModalClose} />
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

      {/* <ModalConfigNotification visible={isVisible} onClose={handleModalClose} /> */}
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
  conteinerHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 24,
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
    display: "flex",
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  subTitle: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  leftConteiner: {
    justifyContent: "center",
    marginLeft: 10,
  },
  rightConteiner: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
