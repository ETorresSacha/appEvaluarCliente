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
import { orderData } from "../../utils/thunks/Thunks";

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
  // useEffect(() => {
  //   loadCustomer();
  //   //handleSort("fecha", order);
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      loadCustomer();
      //return () => unsubscribe();
    }, [])
  );
  //console.log(data.dataResult[0].resultPrestamo);
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
  return (
    <View style={styles.container}>
      <NavBar data={data} setData={setData} />
      <ScrollView style={styles.containerCuotas}>
        <View style={styles.containerTitle}>
          <Pressable
            style={styles.title}
            onPress={() => handleSort("dni", order)}
          >
            <Text style={{ fontWeight: "bold" }}>DNI</Text>
          </Pressable>
          <Pressable
            style={styles.title}
            onPress={() => handleSort("nombre", order)}
          >
            <Text style={{ fontWeight: "bold" }}>NOMBRE</Text>
          </Pressable>
          <Pressable
            style={styles.title}
            onPress={() => handleSort("fecha", order)}
          >
            <Text style={{ fontWeight: "bold" }}>FECHA DE PAGO</Text>
          </Pressable>
          <Pressable
            style={styles.title}
            onPress={() => handleSort("cuota", order)}
          >
            <Text style={{ fontWeight: "bold" }}>CUOTA</Text>
          </Pressable>
        </View>
        {data?.dataResult?.map((element, index) => {
          return (
            <View
              key={index}
              style={index % 2 == 0 ? styles.dataPar : styles.dataImpar}
            >
              <Text style={styles.dataText}>{element.dni}</Text>
              <Text style={styles.dataText}>{`${element.nombre}`}</Text>
              <Text style={styles.dataText}>
                {element?.resultPrestamo[0]?.fechaPago}
              </Text>
              <Text style={styles.dataText}>
                {element?.resultPrestamo[0]?.montoCuota}
              </Text>
              <Pressable style={styles.icon}>
                <Icon name="edit" size={25} color="black" />
              </Pressable>
              <Pressable
                style={styles.icon}
                onPress={() => alertDelete(data?.dataResult[index].uuid)}
              >
                <Icon name="delete" size={25} color="black" />
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
    paddingHorizontal: 10,
  },
  content: {
    marginVertical: 16,
  },
  buttonContainer: {
    flex: 1,
  },
  containerTitle: {
    height: 30,
    fontSize: 16,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 4,
    justifyContent: "space-evenly",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
  },
  title: {
    fontSize: 16,
    width: 60,
    paddingRight: 10,
    alignItems: "center",
    fontWeight: "bold",
  },
  containerCuotas: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    paddingVertical: 10,
  },
  dataPar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(189, 238, 247, 0.888)",
    padding: 5,
  },
  dataImpar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(123, 220, 231)",
    padding: 5,
  },
  dataText: {
    fontSize: 15,
    paddingHorizontal: 5,
    marginHorizontal: 2,
  },
  icon: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
//! TENEMOS QUE CREAR UN BOTON PARA REDIRIGIR AL COMPONENTE NEWFORM, Y HACER LA FUNCIONALIDAD PARA
//! CREAR CLIENTE Y PROGRAMA, SOLO SI SERA UN NUEVO CLIENTE,

//! EN ESTE COMPONENTE REDERIZAREMOS A LOS CLIENTE Y LA ALERTA DE PAGO
