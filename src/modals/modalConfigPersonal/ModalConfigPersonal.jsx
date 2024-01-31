import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  Share,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import InfNegocio from "./modalOptions/InfNegocio";
import Configuration from "./modalOptions/Configuration";

const optionsData = ["Información Negocio", "Recomendar App", "Configuración"];

const ModalConfigPersonal = ({ visible, onClose, setDataHome, setEnable }) => {
  const url = "https://play.google.com/store/apps/details?id=com.pedidosya"; //! este link esta para cambiar, se cambiará cuando se suba a play store

  const [enablerNeg, setEnableNeg] = useState(false);
  const [enablerConf, setEnableConf] = useState(false);

  const options = (value) => {
    switch (value) {
      case "Información Negocio":
        setEnableNeg(true);
        break;
      case "Recomendar App":
        onShare();
        break;
      case "Configuración":
        setEnableConf(true);
    }
    onClose();
  };

  // Recomendar app
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Hola! Te recomiendo esta app para administrar tus clientes, cobranza, notificaciones y mas." +
          "\n" +
          "\n" +
          url,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("shared with activity type of: ", result.activityType);
        } else {
        }
      } else if (result.action == Share.dismissedAction) {
        console.log("dismissed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => onClose()}
      >
        <TouchableWithoutFeedback onPress={() => onClose()}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
          {optionsData.map((element, index) => {
            return (
              <Pressable onPress={() => options(element)} key={index}>
                <Text style={styles.text}>{element}</Text>
              </Pressable>
            );
          })}
        </View>
      </Modal>

      {/* MODALES DE LAS OPCIONES */}
      <InfNegocio
        enablerNeg={enablerNeg}
        setEnableNeg={setEnableNeg}
        setDataHome={setDataHome}
        setEnable={setEnable}
      />
      <Configuration enablerConf={enablerConf} setEnableConf={setEnableConf} />
    </View>
  );
};

export default ModalConfigPersonal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "beige",
    borderRadius: 2,
    position: "absolute",
    top: "1%",
    right: "1%",
  },
  text: {
    fontSize: 17,
    color: "black",
    margin: 10,
  },
});
