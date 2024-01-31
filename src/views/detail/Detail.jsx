import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "@rneui/themed";
import UseStorage from "../../components/hooks/UseHookStorage";
import { useNavigation } from "@react-navigation/native";
import Pay from "../../components/pay/Pay";
import Notification from "../../components/notification/Notification";
import Header from "../../components/header/Header";
import Loading from "../../components/loading/Loading";

const Detail = (props) => {
  const color = props.route.params.typeColor;
  const id = props.route.params.id;
  const enable = props.route.params.enable;
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
      navigation.navigate("Clientes");
    } catch (error) {
      console.error();
    }
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
                  <TouchableOpacity style={styles.icon}>
                    <Icon name="edit" size={30} color="cornsilk" />
                  </TouchableOpacity>
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
            <Pay data={user} />

            <Notification data={user} color={color} />
            <TouchableOpacity
              style={styles.verCronograma}
              onPress={() =>
                navigation.navigate("Cronograma", {
                  data: user[0].resultPrestamo,
                  id: id,
                })
              }
            >
              <Text style={styles.subTitle}> Ver conograma</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
    // <ScrollView style={styles.container}>
    //   <View>
    //     <Header
    //       title={"Detalle"}
    //       back={!enable ? "Clientes" : "Clientes cancelados"}
    //     />
    //     <View style={styles.containerData}>
    //       <View style={styles.containerTitle}>
    //         <Text style={styles.title}>DATOS DEL CLIENTE</Text>
    //         <View style={styles.iconos}>
    //           <TouchableOpacity style={styles.icon}>
    //             <Icon name="edit" size={30} color="cornsilk" />
    //           </TouchableOpacity>
    //           <TouchableOpacity
    //             style={styles.icon}
    //             onPress={() => alertDelete(id)}
    //           >
    //             <Icon name="delete" size={30} color="cornsilk" />
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //       <View style={styles.Data}>
    //         <View style={styles.item}>
    //           <Text style={styles.itemTitle}>Nombres: </Text>
    //           <Text style={styles.itemText}>{user[0]?.nombre}</Text>
    //         </View>
    //         <View style={styles.item}>
    //           <Text style={styles.itemTitle}>Apellidos: </Text>
    //           <Text style={styles.itemText}>{user[0]?.apellido}</Text>
    //         </View>
    //         <View style={styles.item}>
    //           <Text style={styles.itemTitle}>DNI: </Text>
    //           <Text style={styles.itemText}>{user[0]?.dni}</Text>
    //         </View>
    //         <View style={styles.item}>
    //           <Text style={styles.itemTitle}>Celular: </Text>
    //           <Text style={styles.itemText}>{user[0]?.celular}</Text>
    //         </View>
    //         <View style={styles.item}>
    //           <Text style={styles.itemTitle}>Correo: </Text>
    //           <Text style={styles.itemText}>{user[0]?.correo}</Text>
    //         </View>
    //       </View>
    //     </View>
    //     <Pay data={user} setCompleteLoading={setCompleteLoading} />

    //     <Notification data={user} color={color} />
    //     <TouchableOpacity
    //       style={styles.verCronograma}
    //       onPress={() =>
    //         navigation.navigate("Cronograma", {
    //           data: user[0].resultPrestamo,
    //           id: id,
    //         })
    //       }
    //     >
    //       <Text style={styles.subTitle}> Ver conograma</Text>
    //     </TouchableOpacity>
    //   </View>
    // </ScrollView>
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
//!falta la funcion de editar
//! CAMBIAR EL BOTON VER CRONOGRAMA
