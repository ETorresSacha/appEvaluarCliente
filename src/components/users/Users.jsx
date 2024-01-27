import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  datePay,
  fechaPagoAtomatico,
  formatDate,
} from "../../utils/thunks/Thunks";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { format } from "date-fns";

const Users = ({ data, color, enable }) => {
  const navigation = useNavigation();

  // estilos dinamico del ícono de alerta
  const [estilos, setEstilos] = useState({
    fontSize: 40,
  });

  const cambiarColor = (color) => {
    const estilosCopia = { ...estilos };
    estilosCopia.color = color;
    setEstilos(estilosCopia);
  };

  useEffect(() => {
    if (color) cambiarColor(color);
  }, [color]);

  return (
    <View>
      {data?.map((element, index) => {
        return (
          <View
            key={element.uuid}
            style={
              index % 2 == 0
                ? [styles.dataItem, { backgroundColor: "rgb(31, 36, 36)" }]
                : [
                    styles.dataItem,
                    { backgroundColor: "rgba(55, 59, 59, 0.757)" },
                  ]
            }
          >
            <TouchableOpacity
              style={styles.touchItem}
              onPress={() =>
                navigation.navigate("Detalle", {
                  id: element.uuid,
                  typeColor: color ? color : null,
                  enable: enable ? enable : null,
                })
              }
            >
              {/* DNI */}
              <Text style={styles.dataText}>{element?.dni}</Text>

              {/* Nombre */}
              <Text
                style={
                  enable
                    ? [styles.textMonto, { marginRight: 20 }]
                    : [styles.textMonto, { width: 80 }]
                }
              >
                {`${element?.nombre?.split(" ")[0]}`}
              </Text>

              {/* Fecha */}
              <Text
                style={
                  enable
                    ? [styles.dataText, { marginRight: 10 }]
                    : [styles.dataText]
                }
              >
                {enable
                  ? formatDate(element?.fechaDesembolso)
                  : formatDate(datePay(element))}
              </Text>

              {/* Monto */}
              <Text
                style={
                  enable
                    ? [styles.textMonto, { marginRight: 10 }]
                    : [styles.textMonto, { width: 80, paddingLeft: 10 }]
                }
              >
                {enable
                  ? element?.capital
                  : element?.resultPrestamo[0]?.montoCuota}
              </Text>

              {/* Icono de la alerta */}
              {enable ? null : (
                <MaterialIcons
                  name="notifications"
                  style={color ? estilos : styles.iconAlertOff}
                />
              )}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  dataItem: {
    display: "flex",
    height: 55,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 5,
    alignItems: "center",
    paddingVertical: 7,
  },
  touchItem: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
    color: "rgb(66, 242, 46)",
    fontSize: 40,
  },
  iconAlertOnRed: {
    color: "red",
    fontSize: 40,
  },
  textMonto: {
    fontSize: 17,
    color: "cornsilk",
  },
});
