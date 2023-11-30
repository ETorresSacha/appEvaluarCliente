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
                style={{ width: 90, paddingHorizontal: 5, fontSize: 17 }}
              >{`${element.nombre}`}</Text>
              <Text style={styles.dataText}>
                {formatDate(element?.resultPrestamo[0]?.fechaPago)}
              </Text>
              <Text
                style={{
                  display: "flex",
                  width: 90,
                  paddingHorizontal: 5,
                  fontSize: 17,
                  backgroundColor: "green",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
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
    //paddingHorizontal: 10,
    backgroundColor: "rgb(31, 36, 36)",
  },
  content: {
    //marginVertical: 16,
  },
  buttonContainer: {
    flex: 1,
  },
  containerTitle: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    height: 50,
    display: "flex",
    flexDirection: "row",
    //paddingVertical: 4,
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
  },
  containerCuotas: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "gray",
    backgroundColor: "white",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    //paddingVertical: 10,
  },
  dataPar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "rgba(189, 238, 247, 0.888)",
  },
  dataImpar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "rgb(123, 220, 231)",
  },
  dataText: {
    fontSize: 17,

    paddingHorizontal: 5,
    //paddingHorizontal: 5,
    //marginHorizontal: 2,
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
