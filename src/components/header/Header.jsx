import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import ModalOptionsCustomer from "../../modals/modalOptionsCustomer/ModalOptionsCustomer";

const Header = ({
  title,
  dataConfiguration,
  back,
  id,
  enable,
  dataExcelExport,
  setDataImport,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.conteiner}>
      {/* Retornar */}
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

      {/* Title */}
      <View style={styles.rightConteiner}>
        <Text style={styles.subtitle}>{title}</Text>
      </View>

      {/* Opciones para exportar e importar data */}
      {title == "Clientes" ? (
        <Pressable
          style={styles.optionsCustomer}
          onPress={() => setIsVisible(true)}
        >
          <SimpleLineIcons
            name="options-vertical"
            style={{ color: "cornsilk", fontSize: 25 }}
          />
        </Pressable>
      ) : null}

      {/* Modal opciones para exportar e importar data*/}
      <ModalOptionsCustomer
        visible={isVisible}
        setIsVisible={setIsVisible}
        dataExcelExport={dataExcelExport}
        setDataImport={setDataImport}
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
