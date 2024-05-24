import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  ImageBackground,
  Button,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ItemsHome from "../../components/itemsHome/ItemsHome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import ModalConfigPersonal from "../../modals/modalConfigPersonal/ModalConfigPersonal";
import UseStorageBusiness from "../../components/hooks/UseHookDataNeg";
import UseStorageConfiguration from "../../components/hooks/UseHookConfiguration";
import fondoHome from "../.././../assets/fondoHome.jpg";
import logo from "../../../assets/credicheck.png";

import * as XLSX from "xlsx";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { Base64 } from "js-base64";
import { Buffer } from "buffer";

const Home = () => {
  const { onGetBusiness } = UseStorageBusiness();
  const { onGetConfiguration } = UseStorageConfiguration();
  const [isVisible, setIsVisible] = useState(false);
  const [enable, setEnable] = useState(false); // Para visualizar los cambios en el home
  const [dataBusiness, setDataBusiness] = useState([]); // Para los datos de la informacion del negocio
  const [dataConfiguration, setDataConfiguration] = useState({}); //Datos de la configuración

  //TODO
  //! VAMOS A ELIMINAR LIBRERIAS QUE ESTAN DE MAS, TAMBIEN VAMOS A ORDENAR EL CODIGO Y UBICAR UNA POSICION DE DONDE EXPORTAREMOS
  //! DESPUES BUSCAMOS LA FOR DE IMPORTAR EL EXCEL DE CUALQUIER PARTE Y HACEMOS QUE LEA CORRECTAMENTE LA APLICACION
  const data = [
    { name: "John", age: 30, city: "New York" },
    { name: "Jane", age: 25, city: "Los Angeles" },
    { name: "Peter", age: 40, city: "Chicago" },
  ];

  const createExcel = async () => {
    // Convertir el array de objetos a un array de arrays
    const worksheetData = [
      Object.keys(data[0]), // Encabezados
      ...data.map((item) => Object.values(item)), // Filas de datos
    ];

    // Crear una nueva hoja de cálculo
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Crear un nuevo libro de trabajo
    const workbook = XLSX.utils.book_new();

    // Añadir la hoja de cálculo al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generar el archivo Excel en formato binario
    const excelBinary = XLSX.write(workbook, {
      type: "binary",
      bookType: "xlsx",
    });

    // Convertir el binario a un buffer
    const buffer = Buffer.from(excelBinary, "binary");

    // Convertir el buffer a una cadena base64
    const excelBase64 = buffer.toString("base64");

    // Guardar el archivo en el sistema de archivos
    const filePath = FileSystem.documentDirectory + "data.xlsx";
    await FileSystem.writeAsStringAsync(filePath, excelBase64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Compartir el archivo
    await Sharing.shareAsync(filePath);
  };

  //TODO
  // Cargar los datos de la financiera
  const loadNegocio = async () => {
    try {
      const result = await onGetBusiness();
      setDataBusiness(result == undefined ? dataBusiness : result);
      setEnable(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Cargar los datos de la configuración
  const loadCongiguration = async () => {
    try {
      let result = await onGetConfiguration();

      setDataConfiguration({
        ...dataConfiguration,
        tpm: !result ? "0.08" : result[0]?.tpm,
        ccv: !result ? "2" : result[0]?.ccv,
        intMoratorio: !result ? "20" : result[0]?.intMoratorio,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Cerrar el modal
  const handleModalClose = async (shouldUpdate) => {
    if (shouldUpdate) {
      Alert.alert("Se guardó correctamente");
    }
    setIsVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadNegocio();
      loadCongiguration();
    }, [enable])
  );

  return (
    <ImageBackground source={fondoHome} style={styles.background}>
      {/* HEADER */}
      <View style={styles.conteinerHeader}>
        <View style={styles.rightConteiner}>
          <Image source={logo} style={styles.profileImage}></Image>
        </View>
        <Pressable
          style={styles.leftConteiner}
          onPress={() => setIsVisible(true)}
        >
          <SimpleLineIcons
            name="options-vertical"
            style={{ color: "cornsilk", fontSize: 25 }}
          />
        </Pressable>
      </View>
      <Button title="Download From URL" onPress={createExcel}></Button>

      {/* MODAL OPCIONES */}
      <ModalConfigPersonal
        visible={isVisible}
        onClose={handleModalClose}
        setDataHome={setDataBusiness}
        setEnable={setEnable}
        dataConfiguration={dataConfiguration}
        setDataConfiguration={setDataConfiguration}
      />

      {/* BIENVENIDO */}
      <View style={{ paddingTop: 20 }}>
        <View style={styles.institutionTitle}>
          <Text style={styles.title}>BIENVENIDO</Text>
        </View>
        <View style={styles.containerSwitch}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.subTitle}>
              {!dataBusiness[0]?.negocio
                ? "Tu Financiera"
                : dataBusiness[0]?.negocio}
            </Text>
          </View>
        </View>
      </View>

      {/* ITEMS DE LAS OPCIONES */}
      <ItemsHome dataConfiguration={dataConfiguration} />
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // o 'contain' según tu preferencia
    padding: 12,
  },
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "rgb(31, 36, 36)",
  },
  conteinerHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 24,
  },
  title: {
    paddingVertical: 10,
    color: "cornsilk",
    fontSize: 17,
    fontWeight: "bold",
  },

  institutionTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  containerSwitch: {
    display: "flex",
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  subTitle: {
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
  },
  leftConteiner: {
    justifyContent: "center",
    marginLeft: 10,
  },
  rightConteiner: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
