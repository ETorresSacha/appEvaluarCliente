import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ItemsHome from "../../components/itemsHome/ItemsHome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import ModalConfigPersonal from "../../modals/modalConfigPersonal/ModalConfigPersonal";
import UseStorageBusiness from "../../components/hooks/UseHookDataNeg";
import UseStorageConfiguration from "../../components/hooks/UseHookConfiguration";
import Alerta from "../alert/Alerta";

const user = {
  name: "Erik Torres Sacha",
  uri: "https://media.licdn.com/dms/image/D4E03AQH-M4FFjGHveA/profile-displayphoto-shrink_400_400/0/1693329901508?e=1704931200&v=beta&t=07dlpl6eAU2K3xnJx0oL0-v76Br4jWK0Acj9BXkgCfc",
};

const img =
  "https://img2.wallspic.com/crops/6/2/5/5/7/175526/175526-luz-smartphone-agua-morado-liquido-1242x2688.jpg";

const Home = () => {
  const { onGetBusiness } = UseStorageBusiness();
  const { onGetConfiguration } = UseStorageConfiguration();
  const [isVisible, setIsVisible] = useState(false);
  const [enable, setEnable] = useState(false); // Para visualizar los cambios en el home
  const [dataBusiness, setDataBusiness] = useState([]); // Para los datos de la informacion del negocio
  const [dataConfiguration, setDataConfiguration] = useState({}); //Datos de la configuración

  // Cargar los datos de la financiera
  const loadNegocio = async () => {
    try {
      const result = await onGetBusiness();
      setDataBusiness(result == undefined ? dataBusiness : result);
      setEnable(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Cargar los datos de la configuración
  const loadCongiguration = async () => {
    try {
      let result = await onGetConfiguration();

      setDataConfiguration({
        ...dataConfiguration,
        tpm: !result ? "0.08" : result[0]?.tpm,
        ccv: !result ? "2" : result[0]?.ccv,
        intMoratorio: !result ? "20" : result[0]?.intMoratorio,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Cerrar el modal
  const handleModalClose = async (shouldUpdate) => {
    if (shouldUpdate) {
      Alert.alert("Se guardó correctamente");
    }
    setIsVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadNegocio();
      loadCongiguration();
    }, [enable])
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={[StyleSheet.absoluteFill]}></Image>

      {/* HEADER */}
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
      <Alerta />
      {/* MODAL OPCIONES */}
      <ModalConfigPersonal
        visible={isVisible}
        onClose={handleModalClose}
        setDataHome={setDataBusiness}
        setEnable={setEnable}
        dataConfiguration={dataConfiguration}
        setDataConfiguration={setDataConfiguration}
      />

      {/* BIENVENIDO */}
      <View style={{ paddingTop: 20 }}>
        <View style={styles.institutionTitle}>
          <Text style={styles.title}>BIENVENIDO</Text>
        </View>
        <View style={styles.containerSwitch}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.subTitle}>
              {!dataBusiness[0]?.negocio
                ? "Tu Financiera"
                : dataBusiness[0]?.negocio}
            </Text>
          </View>
        </View>
      </View>

      {/* ITEMS DE LAS OPCIONES */}
      <ItemsHome dataConfiguration={dataConfiguration} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "rgb(31, 36, 36)",
    //alignItems: "center",
    //justifyContent: "center",
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
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "rgba(36, 146, 224, 0.625)",
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
    fontSize: 35,
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
  fondo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  containerLogo: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});
