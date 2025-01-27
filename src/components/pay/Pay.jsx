import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import UseStorage from "../hooks/UseHookStorage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { formatDate } from "../../utils/thunks/Thunks";
import Loading from "../loading/Loading";

const Pay = ({
  data,
  indice,
  setIndice,
  modify,
  dataSee,
  cancelledShare,
  setCancelledShare,
  updatePrestamo,
  intMora,
  color,
}) => {
  const { onUpdateStatusPay } = UseStorage();
  const [payShare, setPayShere] = useState([]); // Guardar el pago
  const [enable, setEnable] = useState(false); // Boton de cancelar pago (ON OFF)

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

  //! OJO: EN ESTA PARTE LO QUE ESTAMOS PENSANDO ES AÑADIR UNA CUOTA NETA, SIN ENBARGO, PARA ESO NECESITAMOS QUE
  //! SE CREE UNA  CUOTA QUE SERA SIN LA MORA, LA CUOTA NETA SERA LA QUE SERA UNA SUMA ENTRE LA CUOTA MENSUAL Y SI EXISTE UNA MORA
  //! SE SUMARA.

  //! VER TAMBIEN VAMOS A VER SI LA MORA VA SER VISIBLE CUANDO EXISTA O NO EXISTA LA MORA, ESO ESTA PARA VER, OTRO TAMBIEN AÑADIREMOS LOS DIAS DE MORA
  //! CREO QUE TAMBIEN VAMOS A QUITAR ALGUNOS ELEMENTOS, TENEMOS QUE VER SI SON O NO NECESARIOS
  //! POR ULTIMO Y NO MENOS IMPORTANTE, VAMOS A VER SI AÑADIMOS EL COLOR ROJO COMO SIMBOLO DE QUE ESTE CLIENTE SE ENCUENTRA EN MORA, ESTO SERA EN LOS PAGOS DEL DETALLE.

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
                justifyContent: "space-around",
                paddingBottom: 15,
              }}
            >
              <View style={[styles.containerSubTitle, { gap: 3 }]}>
                <Text style={[styles.subTitle, { fontWeight: "bold" }]}>
                  Fecha de pago:
                </Text>
                <Text style={[styles.subTitle, { color: "orange" }]}>
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
                  { justifyContent: "space-around", gap: 3 },
                ]}
              >
                <Text style={[styles.subTitle, { fontWeight: "bold" }]}>
                  Cuota total:
                </Text>
                <Text
                  style={[
                    styles.subTitle,
                    {
                      color: color == "red" ? color : "orange",
                      fontSize: dataSee?.cuotaNeto?.length >= 8 ? 15 : 17,
                    },
                  ]}
                >
                  S/{" "}
                  {!cancelledShare
                    ? parseFloat(dataSee?.cuotaNeto) + parseFloat(intMora)
                    : "0"}
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
                  S/ {dataSee?.capital}
                </Text>
              </View>

              {/* Total del interes */}
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Total del interes</Text>
                <Text style={{ color: "white", fontSize: 17 }}>
                  S/ {dataSee?.interesTotal}
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

              {/* INTERES */}
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Interes</Text>
                <Text style={{ color: "white", fontSize: 17 }}>
                  {data[0].interes} %
                </Text>
              </View>
              {/* CUOTA */}
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Cuota</Text>
                <Text style={{ color: "white", fontSize: 17 }}>
                  S/ {!cancelledShare ? dataSee?.cuotaNeto : "0"}
                </Text>
              </View>
              {/* MORA */}
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Mora</Text>
                <Text
                  style={{
                    color: color == "red" ? color : "white",
                    fontSize: 17,
                  }}
                >
                  S/ {parseFloat(intMora).toFixed(2)}
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
    fontSize: 16,
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
