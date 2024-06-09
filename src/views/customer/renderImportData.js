// Función para importar y renderizar la data

import { Alert } from "react-native";
import { importExcel } from "../../modals/modalOptionsCustomer/importExcel";
import UseStorage from "../../components/hooks/UseHookStorage";

const {  onSaveCronograma } = UseStorage();

export const renderImportData =(valueImport,setValueImport, data, dataImport, setDataImport)=>{
    if (valueImport) {
      if (data?.dataResult?.length != 0) {
        Alert.alert(
          "¡ALERTA!",
          "Existen datos guardados. Si continúa, se borrarán los datos actuales.\n ¿Desea continuar?",
          [
            {
              text: "Si",
              onPress: async () => importExcel(setDataImport),
              style: "destructive",
            },
            {
              text: "No",
              style: "destructive",
            },
          ]
        );
      } else {
        importExcel(setDataImport); // importa
      }
      setValueImport(false);
    }
    const saveImport = async () => {
      await onSaveCronograma(dataImport, "import"); // guarda en el storage
    };
    if (dataImport.length != 0) {
      if (dataImport.error) {
        setDataImport([]); // vuelve a setear el estado como estaba en un inicio
        return Alert.alert("Los datos no son válidos");
      } else {
        saveImport();
      }
    }
  }