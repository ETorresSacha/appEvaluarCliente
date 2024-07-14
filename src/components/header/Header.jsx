import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalOptionsCustomer from "../../modals/modalOptionsCustomer/ModalOptionsCustomer";
import Entypo from "@expo/vector-icons/Entypo";

const Header = ({
  title,
  //dataConfiguration,
  back,
  //id,
  //enable,
  data,
  setValueImport,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();
  console.log("data: ", data);
  //! error cuando entro primero al cronograma y despues editar
  const backFunction = (value) => {
    switch (value) {
      case "Clientes":
        navigation.navigate(value, { data: data });
        break;
      case "Detalle":
        navigation.navigate(value, data);
        break;
      case "Nuevo cliente":
        navigation.navigate(value, data);
        break;
      case "Clientes":
        navigation.navigate("Home");
        break;
      default:
        navigation.navigate("Home");
    }
  };
  //  console.log("data header: ", data);
  return (
    <View style={styles.conteiner}>
      {/* Retornar */}
      <TouchableOpacity
        style={styles.leftConteiner}
        onPress={
          () => backFunction(back)
          // id
          //   ? navigation.navigate("Detalle", {
          //       id: id,
          //       typeColor: null,
          //       enable: enable ? enable : null,
          //       dataConfiguration: dataConfiguration,
          //     })
          //   : navigation.navigate(
          //       back
          //         ? back == "Nuevo cliente"
          //           ? "Nuevo cliente"
          //           : back
          //         : "Home",
          //       {
          //         dataConfiguration:
          //           back == "Nuevo cliente" ? data?.dataConfiguration : null,
          //         editValue: data?.editValue ? data?.editValue : null,
          //       }
          //     )
        }
      >
        <Entypo name="reply" style={{ color: "cornsilk", fontSize: 35 }} />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.rightConteiner}>
        <Text style={styles.subtitle}>{title}</Text>
      </View>

      {/* Opciones para exportar e importar data */}
      {title == "Clientes" ? (
        <TouchableOpacity
          style={styles.optionsCustomer}
          onPress={() => setIsVisible(true)}
        >
          <MaterialCommunityIcons
            name="database"
            size={40}
            color="rgb(36, 224, 221)"
          />
        </TouchableOpacity>
      ) : null}

      {/* Modal opciones para exportar e importar data*/}
      <ModalOptionsCustomer
        visible={isVisible}
        setIsVisible={setIsVisible}
        setValueImport={setValueImport}
      />
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
  optionsCustomer: {
    justifyContent: "center",
    marginRight: 10,
  },
});
