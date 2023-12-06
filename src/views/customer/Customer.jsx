import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { Icon } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import UseStorage from "../../components/hooks/UseHookStorage";
import NavBar from "../../components/navBar/NavBar";
import { formatDate, orderData } from "../../utils/thunks/Thunks";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const Customer = () => {
  const navigation = useNavigation();
  const { onGetCronograma } = UseStorage();
  const [order, setOrder] = useState(false);
  const [data, setData] = useState({
    dataResult: [],
    dataResultCopy: [],
  });

  const loadCustomer = async () => {
    // Trae los datos guardados del local storage
    try {
      const resultCustomer = await onGetCronograma();

      setData({
        ...data,
        dataResult: resultCustomer,
        dataResultCopy: resultCustomer,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadCustomer();
      //return () => unsubscribe();
    }, [])
  );

  // Ordenar
  const handleSort = (type, value) => {
    const result = orderData(type, data.dataResult, value);
    setData({ ...data, dataResult: result });
    setOrder(!value);
  };

  //! LA FECHA CONECTADO A LA ALARMA
  const fechaPagoDinamico = (value) => {};
  console.log(data.dataResult[0]);
  return (
    <View style={styles.container}>
      <NavBar data={data} setData={setData} />
      <ScrollView style={styles.containerCuotas}>
        <View style={styles.containerTitle}>
          <View style={styles.titleText}>
            <Pressable
              style={styles.title}
              onPress={() => handleSort("dni", order)}
            >
              <Text style={styles.texTitle}>DNI</Text>
            </Pressable>
            <Pressable
              style={styles.title}
              onPress={() => handleSort("nombre", order)}
            >
              <Text style={styles.texTitle}>NOMBRE</Text>
            </Pressable>
            <Pressable
              style={styles.title}
              onPress={() => handleSort("fecha", order)}
            >
              <Text style={styles.texTitle}>FECHA DE PAGO</Text>
            </Pressable>
            <Pressable
              style={styles.title}
              onPress={() => handleSort("cuota", order)}
            >
              <Text style={styles.texTitle}>CUOTA</Text>
            </Pressable>
          </View>

          <View
            style={styles.titleAlert}
            //onPress={() => handleSort("cuota", order)}
          >
            <Text style={styles.texTitle}>ALERTA</Text>
          </View>
        </View>
        {data?.dataResult?.map((element, index) => {
          return (
            <View
              key={index}
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
                  {formatDate(element?.resultPrestamo[0]?.fechaPago)}
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
                  fontSize: 30,
                }}
              >
                <MaterialIcons
                  name="notifications"
                  style={{
                    color: "cornsilk",
                    fontSize: 30,
                  }}
                />
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Customer;
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
  icon: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

//! falta  LA ALERTA DE PAGO
//! tenemos que estilizar el icono de alerta(posicion center)
//! al iniciar siempre debe de ordenarse por la fecha
//! far la funcionalidad
