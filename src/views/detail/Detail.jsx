import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import UseStorage from "../../components/hooks/UseHookStorage";
import { useNavigation } from "@react-navigation/native";
import Pay from "../../components/pay/Pay";
import Notification from "../../components/notification/Notification";
import Header from "../../components/header/Header";
import Loading from "../../components/loading/Loading";

const Detail = (props) => {
  const [dataNotification, setDataNotification] = useState(); // Útil para usar en las notificaciones
  const color = props.route.params.typeColor;
  const id = props.route.params.id;
  const enable = props.route.params.enable;
  const dataConfiguration = props.route.params.dataConfiguration;
  const navigation = useNavigation();
  const { onGetCronograma, onDeleteCustomer } = UseStorage();

  const [user, setUser] = useState([]);

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

  useFocusEffect(
    React.useCallback(() => {
      loadCustomerId(id);
      //return () => unsubscribe();
    }, [])
  );

  // Editar
  const edit = (value) => {
    navigation.navigate("Nuevo cliente", {
      user: value,
      editValue: true,
      color,
      id,
      enable,
    });
  };
  // Eliminar

  const handleDelete = async (data) => {
    try {
      const result = await onDeleteCustomer(data);
      navigation.navigate(!enable ? "Clientes" : "Clientes cancelados");
    } catch (error) {
      console.error();
    }
  };

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
  return (
    <View style={styles.container}>
      {user.length == 0 ? (
        <Loading />
      ) : (
        <ScrollView style={styles.container}>
          <View>
            <Header
              title={"Detalle"}
              back={!enable ? "Clientes" : "Clientes cancelados"}
            />
            <View style={styles.containerData}>
              <View style={styles.containerTitle}>
                <Text style={styles.title}>DATOS DEL CLIENTE</Text>
                <View style={styles.iconos}>
                  {enable ? null : (
                    <TouchableOpacity
                      style={styles.icon}
                      onPress={() => edit(user)}
                    >
                      <Icon name="edit" size={30} color="cornsilk" />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => alertDelete(id)}
                  >
                    <Icon name="delete" size={30} color="cornsilk" />
                  </TouchableOpacity>
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
            <Pay data={user} setDataNotification={setDataNotification} />
            <Notification
              data={user}
              color={color}
              dataNotification={dataNotification}
              setDataNotification={setDataNotification}
              dataConfiguration={dataConfiguration}
            />
            <TouchableOpacity
              style={styles.verCronograma}
              onPress={() =>
                navigation.navigate("Cronograma", {
                  data: user[0].resultPrestamo,
                  id: id,
                  enable: enable,
                })
              }
            >
              <Text style={styles.subTitle}> Ver conograma</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
    paddingHorizontal: 15,
  },
  title: {
    paddingVertical: 10,
    color: "cornsilk",
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
    gap: 5,
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  verCronograma: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    height: 40,
    width: 300,
    marginLeft: 55,
    justifyContent: "center",
    borderRadius: 10,
    gap: 10,
    elevation: 5,
    borderWidth: 1,
    backgroundColor: "orange",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
//! TOCA ARREGLAR Y FACTORIZAR EL CÓDIGO
