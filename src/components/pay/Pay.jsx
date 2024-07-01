import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import UseStorage from "../hooks/UseHookStorage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { formatDate } from "../../utils/thunks/Thunks";
import Loading from "../loading/Loading";

const Pay = ({ data, setDataNotification }) => {
  const { onUpdateStatusPay } = UseStorage();

  const [indice, setIndice] = useState(0);
  const [updatePrestamo, setUpdatePrestamo] = useState([]); // ResultPrestamo
  const [modify, setModify] = useState([]); // Editar el status del pago
  const [dataSee, setDataSee] = useState([]); // Datos que se renderizará
  const [cancelledShare, setCancelledShare] = useState(false); // Cuota cancelada
  const [payShare, setPayShere] = useState([]);
  const [enable, setEnable] = useState(false); // Boton de cancelar pago (ON OFF)

  useEffect(() => {
    setModify(data);
    setUpdatePrestamo(data[0]?.resultPrestamo);

    let result = data[0]?.resultPrestamo.find(
      (element) => element.statusPay == false
    );
    // Para pagar la cuota
    if (result != undefined) {
      setDataSee(result);
      setDataNotification(result); // Para las notificaciones
      setIndice(dataSee?.cuota == undefined ? null : dataSee?.cuota - 1);
      setCancelledShare(false);
    }

    // Cuando la cuota ya esta cancelado
    if (result == undefined) {
      setIndice(data[0]?.resultPrestamo.length);
      setDataSee(data[0]?.resultPrestamo[data[0]?.resultPrestamo.length - 1]);
      setDataNotification(
        data[0]?.resultPrestamo[data[0]?.resultPrestamo.length - 1]
      ); // Para las notificaciones
      setCancelledShare(true);
    }
  }, [data, indice, modify, cancelledShare, dataSee]);

  useEffect(() => {
    // Buscamos la última cuota pagado (útil cuando la cuenta esta cancelado)
    let cuotaCancelada = data[0]?.resultPrestamo[indice - 1];
    setPayShere(cuotaCancelada);

    // Deshabilitar y habilitar el botonde cancelar pago
    if (indice == 0) {
      setEnable(true);
    } else {
      setEnable(false);
    }
  }, [indice]);

  //todo-->  Pagar la cuota
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

      await onUpdateStatusPay(modify);
      setCancelledShare(true);
    }
  };

  //todo--> Cancelar el pago de la cuota
  const HandleCancelPay = async () => {
    //! Cuando tiene cuotas pendientes
    if (indice > 0 && indice < updatePrestamo?.length) {
      let objeto = { ...payShare, statusPay: false };

      updatePrestamo.splice(indice - 1, 1, objeto); // Modificamos los pagos
      await onUpdateStatusPay(modify); // Guardamos los datos
      setIndice(indice - 1);
    }

    //! Cuando la deuda esta completamente cancelado
    if (indice == data[0]?.resultPrestamo.length) {
      let indiceCambiar = data[0]?.resultPrestamo.length - 1; //  seleccionamos el ultimo indice del objeto "resultPrestamo"

      let result = data[0]?.resultPrestamo[indiceCambiar]; // buscamos el último pago realizado
      let objeto = { ...result, statusPay: false }; // modificamos el statusPay del último pago de "true" a "false"
      updatePrestamo.splice(indiceCambiar, 1, objeto); // modificamos el array del "resultPrestamo"

      let newResult = {
        ...modify[0],
        uuid: data[0].uuid,
        cancelled: false,
        resultPrestamo: updatePrestamo,
      };

      modify.splice(0, 1, newResult); // Reemplazamos los datos de "modify" con los datos actualizados

      await onUpdateStatusPay(modify); // Guardamos los datos
      setCancelledShare(false);
    }
  };

  return (
    <View style={styles.container}>
      {updatePrestamo == undefined ? (
        <Loading />
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
                justifyContent: "space-evenly",
                paddingBottom: 15,
              }}
            >
              <View style={[styles.containerSubTitle, { gap: 15 }]}>
                <Text style={[styles.subTitle, { fontWeight: "bold" }]}>
                  Fecha de pago:
                </Text>
                <Text
                  style={[styles.subTitle, { width: 100, color: "orange" }]}
                >
                  {!cancelledShare
                    ? dataSee?.fechaPago == undefined
                      ? null
                      : formatDate(dataSee?.fechaPago)
                    : "-  -  -"}
                </Text>
              </View>
              <View
                style={[
                  styles.containerSubTitle,
                  {
                    gap: 15,
                    justifyContent: "space-around",
                    width: 130,
                  },
                ]}
              >
                <Text style={[styles.subTitle, { fontWeight: "bold" }]}>
                  Cuota:
                </Text>
                <Text
                  style={[
                    styles.subTitle,
                    {
                      color: "orange",
                      fontSize: dataSee?.montoCuota?.length >= 8 ? 15 : 17,
                    },
                  ]}
                >
                  S/ {!cancelledShare ? dataSee?.montoCuota : "0"}
                </Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 15, gap: 2 }}>
              {/* Fecha de desemboldo */}
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

              {/* Total del préstamo */}
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Total del préstamo</Text>
                <Text style={{ color: "white", fontSize: 17 }}>
                  S/. {data[0].capital}
                </Text>
              </View>

              {/* Cuotas canceladas */}
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Cuotas canceladas</Text>
                <Text style={{ color: "white", fontSize: 17 }}>
                  {!cancelledShare
                    ? `${dataSee?.cuota - 1}/${updatePrestamo?.length}`
                    : "0"}
                </Text>
              </View>

              {/* Cuotas pendientes */}
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

              {/* Tipo de préstamo */}
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Tipo de préstamo</Text>
                <Text style={{ color: "white", fontSize: 17 }}>
                  {data[0].periodo}
                </Text>
              </View>

              {/* TEA */}
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>TEA</Text>
                <Text style={{ color: "white", fontSize: 17 }}>
                  {data[0].tea} %
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
    justifyContent: "space-around",
  },

  subTitle: {
    fontSize: 17,
    //fontWeight: "bold",
    color: "cornsilk",
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
    marginLeft: 55,
    justifyContent: "center",
    borderRadius: 10,
    gap: 10,
    elevation: 5,
    borderWidth: 1,
  },
});
