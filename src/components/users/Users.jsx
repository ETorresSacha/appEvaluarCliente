import { View, StyleSheet, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { fechaPagoAtomatico, formatDate } from "../../utils/thunks/Thunks";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { format } from "date-fns";
//import { green } from "@mui/material/colors";

const Users = ({ data, red, setRed, color, typeColor, setGreen }) => {
  const navigation = useNavigation();
  const [day, setDay] = useState("");
  const [enable, setEnable] = useState(true);

  // estilos

  const [estilos, setEstilos] = useState({
    fontSize: 40,
    //color: "red"
  });

  const cambiarColor = (color) => {
    const estilosCopia = { ...estilos };
    estilosCopia.color = color;
    setEstilos(estilosCopia);
  };
  //console.log(typeColor);
  useEffect(() => {
    if (color) cambiarColor(color);
  }, [color]);

  const handleAlert = () => {
    navigation.navigate("Alerta");
  };

  useEffect(() => {
    if (red) setEnable(true);
  }, []);

  return (
    <View>
      {data?.map((element, index) => {
        // useEffect(() => {
        //   let result = idCustomerPay.find((ele) => ele == element.uuid);
        //   if (result !== undefined) alertaIcon = true;
        //   else alertaIcon = false;
        // }, []);

        return (
          <View
            key={element.uuid}
            style={index % 2 == 0 ? styles.dataPar : styles.dataImpar}
          >
            <Pressable
              style={{ display: "flex", flexDirection: "row" }}
              onPress={() =>
                navigation.navigate("Detalle", {
                  id: element.uuid,
                })
              }
            >
              <Text style={styles.dataText}>{element.dni}</Text>
              <Text
                style={{
                  width: 80,
                  fontSize: 17,
                  color: "cornsilk",
                }}
              >{`${element.nombre.split(" ")[0]}`}</Text>
              <Text style={styles.dataText}>
                {formatDate(fechaPagoAtomatico(element?.resultPrestamo))}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: "cornsilk",
                  width: 80,
                  paddingLeft: 10,
                }}
              >
                {element?.resultPrestamo[0]?.montoCuota}
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: 40,
                color: "white",
                fontSize: 40,
              }}
              onPress={enable ? handleAlert : null}
            >
              <MaterialIcons
                name="notifications"
                style={color ? estilos : styles.iconAlertOff}
              />
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
  },
  containerTitle: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
  },
  titleText: {
    width: 320,
    display: "flex",
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    textAlign: "center",
  },
  titleAlert: {
    justifyContent: "center",
  },
  texTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
    color: "white",
  },
  containerCuotas: {
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginHorizontal: 7,
  },
  dataPar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
    paddingVertical: 7,
    backgroundColor: "rgb(31, 36, 36)",
  },
  dataImpar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
    paddingVertical: 7,
    tintColor: "blue",
    backgroundColor: "rgba(55, 59, 59, 0.757)",
  },
  dataText: {
    fontSize: 17,
    width: 90,
    justifyContent: "flex-start",
    color: "cornsilk",
  },
  iconAlertOff: {
    color: "cornsilk",
    //color: "green",
    //color: "rgb(66, 242, 46)",
    fontSize: 40,
  },
  iconAlertOnYelow: {
    //color: "red",
    color: "rgb(242, 238, 46)",
    fontSize: 40,
  },
  Green: {
    //color: "red",
    color: "rgb(66, 242, 46)",
    fontSize: 40,
  },
  iconAlertOnRed: {
    color: "red",
    //color: "rgb(242, 238, 46)",
    fontSize: 40,
  },
});