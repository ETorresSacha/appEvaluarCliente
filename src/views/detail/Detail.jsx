import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import UseStorage from "../../components/hooks/UseHookStorage";
import Cronograma from "../../components/cronograma/Cronograma";

const Detail = (props) => {
  const id = props.route.params.id;
  const { onGetCronograma } = UseStorage();
  const [user, setUser] = useState({});

  const loadCustomerId = async (id) => {
    // Trae los datos guardados del local storage
    try {
      const resultCustomer = await onGetCronograma();
      const result = resultCustomer.filter((element) => element.uuid == id);
      setUser(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCustomerId(id);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerData}>
        <View style={styles.containerTitle}>
          <Text>DATOS DEL CLIENTE</Text>
        </View>
        <View style={styles.Data}>
          <View style={styles.item}>
            <Text>Nombres y apellidos: </Text>
            <Text>{`${user[0]?.nombre} ${user[0]?.apellido}`}</Text>
          </View>
          <View style={styles.item}>
            <Text>DNI: </Text>
            <Text>{user[0]?.dni}</Text>
          </View>
          <View style={styles.item}>
            <Text>Celular: </Text>
            <Text>{user[0]?.celular}</Text>
          </View>
          <View style={styles.item}>
            <Text>Correo: </Text>
            <Text>{user[0]?.correo}</Text>
          </View>
        </View>
      </View>
      <Cronograma dataPrestamo={user[0]?.resultPrestamo} />
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    padding: 10,
  },
  containerData: {},
  containerTitle: {},
  Data: {},
  item: {
    display: "flex",
    flexDirection: "row",
  },
});
