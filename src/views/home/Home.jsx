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

// import * as FileSystem from "expo-file-system";
// import { shareAsync } from "expo-sharing";
// const downloadFromUrl = async () => {
//   const filename = "smaill.mp4";
//   FileSystem.downloadAsync;
//   const result = await FileSystem.downloadAsync();
//   console.log(result);
//   save(result.uri);
// };
// const save = () => {
//   shareAsync(uri);
// };
// const [download, setDownload] = useState();
// const descarga = async () => {
//   const { uri } = await download.downloadAsync();
//   console.log(uri);
// };

import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const ciudades = [
  {
    ciudad: "Ciudad de México",
    población: 852145,
    entidad: "Ciudad de México",
    país: "México",
  },
  {
    ciudad: "Lima",
    población: 252145,
    entidad: "Lima",
    país: "Perú",
  },
  {
    ciudad: "Santiago",
    población: 102145,
    entidad: "Santiago",
    país: "Chile",
  },
];
const shareCSVFile = async () => {
  try {
    // Datos CSV de ejemplo
    const csvData = "Nombre,Apellido,Edad\nJohn,Doe,30\nJane,Smith,25\n";

    // Guardar el archivo CSV en el sistema de archivos local del dispositivo
    const fileUri = `${FileSystem.documentDirectory}data.csv`;
    console.log(fileUri);
    await FileSystem.writeAsStringAsync(fileUri, csvData, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // Compartir el archivo utilizando expo-sharing
    await Sharing.shareAsync(fileUri, {
      mimeType: "text/csv",
      dialogTitle: "Compartir archivo CSV",
    });

    console.log("Archivo CSV compartido correctamente");
  } catch (error) {
    console.error("Error al compartir el archivo CSV:", error);
  }
};
//! esta parte esta para corregir
const handleExportToExcel = () => {
  const data = [
    { name: "John", age: 30, city: "New York" },
    { name: "Jane", age: 25, city: "San Francisco" },
    { name: "Bob", age: 35, city: "Los Angeles" },
  ];

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generar un blob a partir del libro de trabajo
  // const fileUri = `${FileSystem.documentDirectory}excel`;
  // console.log(fileUri);
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Crear un objeto URL desde el blob
  const url = URL.createObjectURL(blob);

  // Crear un enlace para descargar el archivo Excel
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.xlsx";
  link.click();

  // Liberar el objeto URL creado
  URL.revokeObjectURL(url);
};
//! hasta aqui
// Llama a la función para compartir el archivo CSV
//shareCSVFile();
//!! ESTA PARA PROBAR ESTA FUNCION, NO SE QUE DARA?
//import ExportExcel from "react-export-excel"; //!
//import React from "react";
// import ReactExport from "react-export-excel";

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// este es un ejemplo que ayudara para verificar los cambios
const Home = () => {
  const { onGetBusiness } = UseStorageBusiness();
  const { onGetConfiguration } = UseStorageConfiguration();
  const [isVisible, setIsVisible] = useState(false);
  const [enable, setEnable] = useState(false); // Para visualizar los cambios en el home
  const [dataBusiness, setDataBusiness] = useState([]); // Para los datos de la informacion del negocio
  const [dataConfiguration, setDataConfiguration] = useState({}); //Datos de la configuración

  //TODO
  const generateExcel = () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet([
      ["Name", "Age", "City"],
      ["John Doe", 30, "New York"],
      ["Jane Doe", 25, "Los Angeles"],
    ]);
    XLSX.utils.book_append_sheet(wb, ws, "firstSheet", true);
    const base64 = XLSX.write(wb, { type: "base64" });
    const filename = FileSystem.documentDirectory + "myExcel";
    FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64,
    }).then(() => {
      Sharing.shareAsync(filename);
    });
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

  //! EXPORTAR UN ARCHIVO EXCEL

  // const ExcelFile = ExportExcel.ExcelFile;
  // const ExcelSheet = ExportExcel.ExcelSheet;
  // const ExcelColumn = ExportExcel.ExcelColumn;

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
      <Button title="Download From URL" onPress={generateExcel}></Button>
      {/* 
      <ExcelFile
        element={<Button> Exportar a Excel</Button>}
        filename="Ciudades"
      >
        <ExcelSheet data={ciudades} name="Ciudades pobladas">
          <ExcelColumn label="ciudad" Value="ciudad" />
          <ExcelColumn label="población" Value="población" />
          <ExcelColumn label="entidad" Value="entidad" />
          <ExcelColumn label="país" Value="país" />
        </ExcelSheet>
      </ExcelFile> */}
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
      {/* </View> */}
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
