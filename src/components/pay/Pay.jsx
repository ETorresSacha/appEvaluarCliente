import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import UseStorage from "../hooks/UseHookStorage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { formatDate } from "../../utils/thunks/Thunks";

const Pay = ({ data }) => {
  console.log(data);
  const { onUpdateStatusPay } = UseStorage();

  const [indice, setIndice] = useState(0);
  const [updatePrestamo, setUpdatePrestamo] = useState([]); // ResultPrestamo
  const [modify, setModify] = useState([]); // Editar el status del pago
  const [dataSee, setDataSee] = useState([]); // Datos que se renderizará
  const [cancelledShare, setCancelledShare] = useState(false); // Cuota cancelada
  const [payShare, setPayShere] = useState([]);
  const [enable, setEnable] = useState(true);

  console.log(dataSee);
  //console.log(indice);

  useEffect(() => {
    setModify(data);
    setUpdatePrestamo(data[0]?.resultPrestamo);

    let result = data[0]?.resultPrestamo.find(
      (element) => element.statusPay == false
    );

    if (result != undefined) {
      setDataSee(result);
      setIndice(dataSee?.cuota == undefined ? null : dataSee?.cuota - 1);
      setCancelledShare(false);
    }
    if (result == undefined) {
      setDataSee(data[0]?.resultPrestamo[data[0]?.resultPrestamo.length - 1]);
      setCancelledShare(true);
    }
  }, [data, indice, cancelledShare, payShare, dataSee]);

  useEffect(() => {
    let cuotaCancelada = data[0]?.resultPrestamo[indice - 1];
    setPayShere(cuotaCancelada);

    // Deshabilitar el botonde cancelar pago
    if (indice == 0) {
      setEnable(true);
    }
  }, [indice]);

  // Pagar cuota
  const handlePayShare = async () => {
    let objeto = { ...dataSee, statusPay: true };
    updatePrestamo.splice(indice, 1, objeto);

    setModify({
      ...modify[0],
      uuid: data[0].uuid,
      resultPrestamo: updatePrestamo,
    });
    if (
      indice < (updatePrestamo == undefined ? null : updatePrestamo.length - 1)
    ) {
      // Pago de la cuenta
      setDataSee({ ...dataSee, statusPay: true });
      setIndice(indice + 1);
      let result = await onUpdateStatusPay(modify);

      setEnable(false); // Habilita el boton de cancelat el pagp
    } else {
      // Cancelación de la deuda
      let objeto = {
        ...modify[0],
        uuid: data[0].uuid,
        cancelled: true,
        resultPrestamo: updatePrestamo,
      };
      await onUpdateStatusPay(objeto);
      setCancelledShare(true);
    }
  };
  console.log(indice);
  // Cancelar el pago de la cuota
  const HandleCancelPay = async () => {
    if (indice == 0) {
      console.log("no hay cuota para cancelar");
    }
    if (indice > 0) {
      let objeto = { ...payShare, statusPay: false };

      updatePrestamo.splice(indice - 1, 1, objeto);

      setModify({
        ...modify[0],
        uuid: data[0].uuid,
        resultPrestamo: updatePrestamo,
      });
      await onUpdateStatusPay(modify);
      setIndice(indice - 1);
    }
  };
  return (
    <View style={styles.container}>
      {updatePrestamo == undefined ? (
        <Text>cargando</Text>
      ) : (
        <View>
          <View style={styles.pagosTitle}>
            <Text style={styles.titleText}>PAGOS</Text>
            <TouchableOpacity
              style={styles.cancelPago}
              onPress={HandleCancelPay}
              disabled={enable}
            >
              <MaterialIcons
                name="settings-backup-restore"
                size={27}
                color="cornsilk"
              />
              <Text
                style={{
                  fontSize: 10,
                  color: "cornsilk",
                }}
              >
                Cancelar Pago
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pagosDetalle}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                paddingBottom: 15,
              }}
            >
              <View style={[styles.containerSubTitle, { gap: 15 }]}>
                <Text style={[styles.subTitle, { color: "cornsilk" }]}>
                  Fecha de pago:
                </Text>
                <Text style={[styles.subTitle, { color: "orange" }]}>
                  {dataSee?.fechaPago == undefined
                    ? null
                    : formatDate(dataSee?.fechaPago)}
                </Text>
              </View>
              <View style={[styles.containerSubTitle, { gap: 15 }]}>
                <Text style={[styles.subTitle, { color: "cornsilk" }]}>
                  Cuota:
                </Text>
                <Text style={[styles.subTitle, { color: "orange" }]}>
                  {!cancelledShare ? dataSee?.montoCuota : "0"}
                </Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 15, gap: 2 }}>
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Fecha de desembolso</Text>
                <Text style={{ color: "white", fontSize: 17 }}>
                  {dataSee?.fechaPago == undefined
                    ? null
                    : formatDate(dataSee?.fechaDesembolso)}
                </Text>
              </View>
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Pago pendiente</Text>
                <Text style={{ color: "white", fontSize: 17 }}>
                  {!cancelledShare ? dataSee?.montoCuota : "0"}
                </Text>
              </View>
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Cuotas pendientes</Text>
                <Text style={{ color: "white", fontSize: 17 }}>
                  {!cancelledShare
                    ? updatePrestamo.length - (dataSee?.cuota - 1)
                    : "0"}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={
              !cancelledShare
                ? [
                    styles.buttonContainer,
                    { backgroundColor: "orange", width: 300 },
                  ]
                : [styles.buttonContainer, { borderColor: "white", width: 300 }]
            }
            onPress={!cancelledShare ? handlePayShare : null}
          >
            {!cancelledShare ? (
              <FontAwesome
                name="money"
                style={{ color: "cornsilk", fontSize: 40 }}
              />
            ) : null}
            <Text style={styles.subTitle}>
              {!cancelledShare ? "Pagar" : "Deuda Cancelado"}
            </Text>
          </TouchableOpacity>

          {/* <Pressable
            style={
              !cancelledShare
                ? [
                    styles.buttonContainer,
                    { backgroundColor: "orange", width: 200 },
                  ]
                : [styles.buttonContainer, { borderColor: "white" }]
            }
            onPress={!cancelledShare ? handlePayShare : null}
          >
            <Text style={styles.subTitle}>
              {!cancelledShare ? "Cancelar pago" : "Deuda Cancelado"}
            </Text>
          </Pressable> */}
        </View>
      )}
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },

  pagosTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  titleText: {
    fontSize: 17,
    color: "cornsilk",
    fontWeight: "bold",
  },
  cancelPago: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  pagosDetalle: {
    marginVertical: 15,
  },

  subTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  containerSubTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    height: 40,
    //width: 300,
    marginLeft: 55,
    justifyContent: "center",
    borderRadius: 10,
    gap: 10,
    elevation: 5,
    borderWidth: 1,
  },
});
