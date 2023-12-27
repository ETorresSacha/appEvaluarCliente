import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";
import UseStorage from "../hooks/UseHookStorage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { formatDate } from "../../utils/thunks/Thunks";

const Pay = ({ data }) => {
  const { onUpdateStatusPay } = UseStorage();

  const [indice, setIndice] = useState(0);
  const [updatePrestamo, setUpdatePrestamo] = useState([]); // ResultPrestamo
  const [modify, setModify] = useState([]); // Editar el status del pago
  const [dataSee, setDataSee] = useState([]); // Datos que se renderizará
  const [cancelledShare, setCancelledShare] = useState(false); // Cuota cancelada

  useEffect(() => {
    setModify(data);
    setUpdatePrestamo(data[0]?.resultPrestamo);

    let result = data[0]?.resultPrestamo.find(
      (element) => element.statusPay == false
    );

    if (result != undefined) {
      setDataSee(result);
      setIndice(result?.cuota == undefined ? null : result?.cuota - 1);
      setCancelledShare(false);
    }
    if (result == undefined) {
      setDataSee(data[0]?.resultPrestamo[data[0]?.resultPrestamo.length - 1]);
      setCancelledShare(true);
    }
  }, [data, indice, cancelledShare]);

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
    } else {
      // Cancelación de la cuenta
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
  return (
    <View style={styles.container}>
      {updatePrestamo == undefined ? (
        <Text>cargando</Text>
      ) : (
        <View>
          <Text style={styles.pagosTitle}>PAGOS</Text>
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
          <Pressable
            style={
              !cancelledShare
                ? [styles.buttonContainer, { backgroundColor: "orange" }]
                : [styles.buttonContainer, { borderColor: "white" }]
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
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },

  pagosTitle: {
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    paddingLeft: 10,
    paddingVertical: 10,
    fontSize: 17,
    color: "cornsilk",
    fontWeight: "bold",
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
    width: 250,
    height: 40,
    marginLeft: 80,
    justifyContent: "center",
    borderRadius: 10,
    gap: 10,
    elevation: 5,
    borderWidth: 1,
  },
});
