// import React, { useState } from 'react';
// import { View, Button, Text } from 'react-native';
// import * as DocumentPicker from 'expo-document-picker';
// import * as XLSX from 'xlsx';

// const ImportExcel = () => {
//   const [data, setData] = useState([]);

//   const handleFilePick = async () => {
//     try {
//       // Permitir al usuario seleccionar un archivo
//       const result = await DocumentPicker.getDocumentAsync({
//         type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
//       });

//       if (result.type === 'cancel') {
//         console.log('User cancelled the picker');
//         return;
//       }

//       const { uri } = result;
//       console.log('File URI:', uri);

//       // Leer el archivo usando fetch
//       const response = await fetch(uri);
//       const blob = await response.blob();
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         const arrayBuffer = e.target.result;
//         const binaryStr = new Uint8Array(arrayBuffer)
//           .reduce((data, byte) => data + String.fromCharCode(byte), '');
//         const workbook = XLSX.read(binaryStr, { type: 'binary' });

//         // Convertir el primer sheet a JSON
//         const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//         const json = XLSX.utils.sheet_to_json(worksheet);
//         setData(json);
//       };
// console.log(data);
//       reader.readAsArrayBuffer(blob);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <View>
//       <Button title="Importar Archivo Excel" onPress={handleFilePick} />
//       <View>
//         {data.map((row, index) => (
//           <Text key={index}>{JSON.stringify(row)}</Text>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default ImportExcel;

import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';

const ImportExcel = () => {
  const [data, setData] = useState([]);

  const handleFilePick = async () => {
    try {
      // Permitir al usuario seleccionar un archivo
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
      });

     // if (result.type === 'success') {
        //const file = result.uri;
        const file = result.assets[0].uri

        //Leer el archivo usando fetch
        const response = await fetch(file);
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
     // }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(data);
  //! YA RENDERIZA EL EXCEL PERO HACER PRUEBAS CUANDO SE SUBE OTROS EXCEL

  return (
    <View>
      <Button title="Importar Archivo Excel" onPress={handleFilePick} />
      <View>
        {data.map((row, index) => (
          <Text key={index}>{JSON.stringify(row)}</Text>
        ))}
      </View>
    </View>
  );
};

export default ImportExcel;
