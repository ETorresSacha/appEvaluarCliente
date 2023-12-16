import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "@rneui/themed";
import UseStorage from "../../components/hooks/UseHookStorage";
import Cronograma from "../../components/cronograma/Cronograma";
import { useNavigation } from "@react-navigation/native";

const Detail = (props) => {
  const id = props.route.params.id;
  const navigation = useNavigation();
  const { onGetCronograma, onDeleteCustomer } = UseStorage();

  const [user, setUser] = useState({});

  // Trae los datos guardados del local storage
  const loadCustomerId = async (id) => {
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
      navigation.navigate("Cliente");
    } catch (error) {
      console.error();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerData}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>DATOS DEL CLIENTE</Text>
          <View style={styles.iconos}>
            <Pressable style={styles.icon}>
              <Icon name="edit" size={25} color="cornsilk" />
            </Pressable>
            <Pressable style={styles.icon} onPress={() => alertDelete(id)}>
              <Icon name="delete" size={25} color="cornsilk" />
            </Pressable>
          </View>
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
      <Cronograma data={user} />
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
    borderBottomColor: "white",
  },
  containerTitle: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
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
  iconos: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
//!falta la funcion de editar
