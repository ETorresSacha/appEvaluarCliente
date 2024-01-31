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
  const { onUpdateStatusPay } = UseStorage();

  const [indice, setIndice] = useState(0);
  const [updatePrestamo, setUpdatePrestamo] = useState([]); // ResultPrestamo
  const [modify, setModify] = useState([]); // Editar el status del pago
  const [dataSee, setDataSee] = useState([]); // Datos que se renderizará
  const [cancelledShare, setCancelledShare] = useState(false); // Cuota cancelada
  const [payShare, setPayShere] = useState([]);
  const [enable, setEnable] = useState(false); // Boton de cancelar pago (ON OFF)

  console.log(modify);
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
      setIndice(data[0]?.resultPrestamo.length);
      setDataSee(data[0]?.resultPrestamo[data[0]?.resultPrestamo.length - 1]);
      setCancelledShare(true);
    }
  }, [data, indice, modify, cancelledShare, dataSee]);

  //console.log(updatePrestamo);

  useEffect(() => {
    // Buscamos la última cuota pagado
    let cuotaCancelada = data[0]?.resultPrestamo[indice - 1];
    setPayShere(cuotaCancelada);

    // Deshabilitar y habilitar el botonde cancelar pago
    if (indice == 0) {
      setEnable(true);
    } else {
      setEnable(false);
    }
  }, [indice]);

  //  Pagar cuota
  const handlePayShare = async () => {
    let objeto = { ...dataSee, statusPay: true };
    updatePrestamo.splice(indice, 1, objeto);

    if (
      indice < (updatePrestamo == undefined ? null : updatePrestamo.length - 1)
    ) {
      // Pago de la cuenta

      setIndice(indice + 1);
      await onUpdateStatusPay(modify);
      setEnable(false); // Habilita el boton de cancelar el pago
    } else {
      // Cancelación de la deuda
      let objeto = {
        ...modify[0],
        uuid: data[0].uuid,
        cancelled: true,
        resultPrestamo: updatePrestamo,
      };
      modify.splice(0, 1, objeto);

      await onUpdateStatusPay(objeto);
      setCancelledShare(true);
    }
  };

  const HandleCancelPay = async () => {
    //! TENEMOS QUE ADICIONAR, QUE PASA CUANDO SE PAGA TODA LA DEUDA
    if (indice == 0) {
      console.log("no hay cuota para cancelar");
    }

    //todo--->esto es lo que se modifico pero es para cambiar
    if (indice == data[0]?.resultPrestamo.length) {
      let indiceCambiar = data[0]?.resultPrestamo.length - 1; //  seleccionamos el ultimo indice

      let result = data[0]?.resultPrestamo[indiceCambiar]; // buscamos el el resultado del prestamo, el ultimo indice
      let objeto = { ...result, statusPay: false }; // modificamos el resultado con es statusPay a false
      updatePrestamo.splice(indiceCambiar, 1, objeto); // modificamos el array del prestamo

      let newResult = {
        ...modify[0],
        uuid: data[0].uuid,
        cancelled: false,
        resultPrestamo: updatePrestamo,
      };

      modify.splice(0, 1, newResult);

      await onUpdateStatusPay(newResult);
      setCancelledShare(false);
    }
    //todo------------------------------------------------

    if (indice > 0 && indice < updatePrestamo?.length) {
      let objeto = { ...payShare, statusPay: false };

      updatePrestamo.splice(indice - 1, 1, objeto);
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
                  {/* {dataSee?.fechaPago == undefined
                    ? null
                    : formatDate(dataSee?.fechaPago)} */}

                  {!cancelledShare
                    ? dataSee?.fechaPago == undefined
                      ? null
                      : formatDate(dataSee?.fechaPago)
                    : "-  -  -"}
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
            disabled={cancelledShare}
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
          {/* 
          <Pressable
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
