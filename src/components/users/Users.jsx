import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { datePay, formatDate } from "../../utils/thunks/Thunks";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Users = ({ data, color, enable, dataConfiguration }) => {
  const navigation = useNavigation();

  // estilos dinámico del ícono de alerta
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
                  dataConfiguration: dataConfiguration,
                })
              }
            >
              {/* DNI */}
              <View>
                <Text style={styles.text}>{element?.dni}</Text>
              </View>

              {/* Nombre */}
              <View style={{ width: 100, paddingLeft: !enable ? 5 : 15 }}>
                <Text style={styles.text}>{`${
                  element?.nombre?.split(" ")[0]
                }`}</Text>
              </View>

              {/* Fecha */}
              {enable ? null : (
                <View>
                  <Text style={styles.text}>
                    {formatDate(datePay(element))}
                  </Text>
                </View>
              )}

              {/* Monto */}
              <View style={{ width: 80, paddingRight: 20 }}>
                <Text
                  style={[styles.text, { textAlign: "right", color: "orange" }]}
                >
                  {enable
                    ? element?.capital
                    : element?.resultPrestamo[0]?.montoCuota}
                </Text>
              </View>

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
  text: {
    fontSize: 15,
    color: "cornsilk",
  },
  iconAlertOff: {
    color: "cornsilk",
    fontSize: 40,
  },
});
