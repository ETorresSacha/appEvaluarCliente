import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import UseStorage from "../../components/hooks/UseHookStorage";
import NavBar from "../../components/navBar/NavBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatDate, orderData } from "../../utils/thunks/Thunks";

const Customer = () => {
  const navigation = useNavigation();
  const { onGetCronograma, onDeleteCustomer } = UseStorage();
  const [order, setOrder] = useState(false);
  const [data, setData] = useState({
    dataResult: [],
    dataResultCopy: [],
  });

  const loadCustomer = async () => {
    // Trae los datos guardados del local storage
    try {
      const resultCustomer = await onGetCronograma();
      //console.log(resultCustomer);
      setData({
        ...data,
        dataResult: resultCustomer,
        dataResultCopy: resultCustomer,
      });
      //data.dataResult.length != 0 ? handleSort("fecha", order) : null; //! al iniciar siempre debe de ordenarse por la fecha
      //handleSort("fecha", order);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(data.dataResult);
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

  // Eliminar
  const alertDelete = (data) => {
    Alert.alert("Eliminar", "¿Desea continuar?", [
      {
        text: "Si",
        onPress: () => handleDelete(data),
        style: "destructive",
      },
      {
        text: "No",
        style: "destructive",
      },
    ]);
  };
  const handleDelete = async (data) => {
    try {
      const result = await onDeleteCustomer(data);
      loadCustomer();
    } catch (error) {
      console.error();
    }
  };
  console.log();
  return (
    <View style={styles.container}>
      <NavBar data={data} setData={setData} />
      <ScrollView style={styles.containerCuotas}>
        <View style={styles.containerTitle}>
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
        {data?.dataResult?.map((element, index) => {
          return (
            <View
              key={index}
              style={index % 2 == 0 ? styles.dataPar : styles.dataImpar}
            >
              <Text style={styles.dataText}>{element.dni}</Text>
              <Text
                style={{
                  width: 90,
                  paddingHorizontal: 5,
                  fontSize: 17,
                  color: "silver",
                }}
              >{`${element.nombre}`}</Text>
              <Text style={styles.dataText}>
                {formatDate(element?.resultPrestamo[0]?.fechaPago)}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: "silver",
                }}
              >
                {element?.resultPrestamo[0]?.montoCuota}
              </Text>
              <Pressable style={styles.icon}>
                <Icon name="edit" size={25} color="silver" />
              </Pressable>
              <Pressable
                style={styles.icon}
                onPress={() => alertDelete(data?.dataResult[index].uuid)}
              >
                <Icon name="delete" size={25} color="silver" />
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
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
  },
  title: {
    fontSize: 16,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  texTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
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
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 9,
    backgroundColor: "rgb(31, 36, 36)",
  },
  dataImpar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 9,
    tintColor: "blue",
    backgroundColor: "rgba(55, 59, 59, 0.757)",
  },
  dataText: {
    fontSize: 17,
    paddingHorizontal: 5,
    color: "silver",
  },
  icon: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

//! falta  LA ALERTA DE PAGO
