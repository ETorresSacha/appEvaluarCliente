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
          <Text style={styles.title}>DATOS DEL CLIENTE</Text>
        </View>
        <View style={styles.Data}>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Nombres: </Text>
            <Text style={styles.itemText}>{user[0]?.nombre}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Apellidos: </Text>
            <Text style={styles.itemText}>{user[0]?.apellido}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>DNI: </Text>
            <Text style={styles.itemText}>{user[0]?.dni}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Celular: </Text>
            <Text style={styles.itemText}>{user[0]?.celular}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Correo: </Text>
            <Text style={styles.itemText}>{user[0]?.correo}</Text>
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
    backgroundColor: "rgb(31, 36, 36)",
  },
  containerData: {
    // backgroundColor: "beige",
    borderBottomColor: "white",

    //borderRadius: 15,
  },
  containerTitle: {},
  title: {
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    paddingVertical: 10,
    color: "cornsilk",
    paddingLeft: 10,
    fontSize: 17,
    fontWeight: "bold",
  },
  Data: {
    padding: 15,
    gap: 5,
  },
  item: {
    display: "flex",
    flexDirection: "row",
  },
  itemTitle: {
    width: 90,
    color: "cornsilk",
    fontSize: 17,
    fontWeight: "bold",
  },
  itemText: {
    color: "white",
    fontSize: 17,
  },
});
