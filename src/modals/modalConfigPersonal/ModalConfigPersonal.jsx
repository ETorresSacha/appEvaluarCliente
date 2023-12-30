import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import InfNegocio from "../../components/optionsPersonal/InfNegocio";

const optionsData = ["Información Negocio", "Recomendar App", "Configuración"];

const ModalConfigPersonal = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const [enable, setEnable] = useState(false);
  console.log(enable);
  const options = () => {
    setEnable(true);
    onClose();
    // if (isVisible) {
    //   navigation.navigate("opciones", { enable: isVisible, close: onclose });
    // }
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
              <Pressable onPress={options} key={index}>
                <Text style={styles.text}>{element}</Text>
              </Pressable>
            );
          })}
        </View>
      </Modal>
      <InfNegocio enable={enable} setEnable={setEnable} />
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
