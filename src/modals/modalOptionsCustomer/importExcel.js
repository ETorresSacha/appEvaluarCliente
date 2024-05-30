import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';

export const importExcel = async (setData) => {
  try {
    // Permitir al usuario seleccionar un archivo
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
    });

    if (result.type === 'cancel') {
      console.log('User cancelled the picker');
      return;
    }
    const  uri   = result.assets[0].uri;

    // Leer el archivo usando fetch
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const binaryStr = new Uint8Array(arrayBuffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '');
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      // Convertir el primer sheet a JSON
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setData(json);
    };
    reader.readAsArrayBuffer(blob);
  } catch (error) {
    console.error('Error:', error);
  }
};

//         {data.map((row, index) => (
//           <Text key={index}>{JSON.stringify(row)}</Text>
//         ))}

