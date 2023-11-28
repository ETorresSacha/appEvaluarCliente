import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import UseStorage from "../../components/hooks/UseHookStorage";
import NavBar from "../../components/navBar/NavBar";

const Customer = () => {
  const navigation = useNavigation();
  const { onGetCronograma } = UseStorage();
  const [data, setData] = useState([]);

  // const handleAddPress = () => {
  //   navigation.navigate("Nuevo cliente");
  // };

  const loadCustomer = async () => {
    // Trae los datos guardados del local storage
    try {
      const resultCustomer = await onGetCronograma();
      setData(resultCustomer);
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
  return (
    <View style={styles.container}>
      {/* <View style={styles.buttonContainer}>
        <Button
          title="Nuevo"
          icon={<Icon name="add" color="#FFF" />}
          radius="lg"
          color="#4ecb71"
          onPress={handleAddPress}
        />
      </View> */}
      <NavBar />
      <ScrollView style={styles.containerCuotas}>
        <View style={styles.containerTitle}>
          <View style={styles.title}>
            <Text style={{ fontWeight: "bold" }}>DNI</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>NOMBRE</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>FECHA DE PAGO</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>CUOTA</Text>
          </View>
        </View>
        {data?.map((element, index) => {
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
});
//! TENEMOS QUE CREAR UN BOTON PARA REDIRIGIR AL COMPONENTE NEWFORM, Y HACER LA FUNCIONALIDAD PARA
//! CREAR CLIENTE Y PROGRAMA, SOLO SI SERA UN NUEVO CLIENTE,

//! EN ESTE COMPONENTE REDERIZAREMOS A LOS CLIENTE Y LA ALERTA DE PAGO
