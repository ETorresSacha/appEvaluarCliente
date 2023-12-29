import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

const SideMenu = ({ visible, onClose, options, onSelect }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.menu}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => {
                onSelect(option);
                onClose();
              }}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const Eliminar2 = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleOptionSelect = (option) => {
    console.log(`Option selected: ${option}`);
    // Aquí puedes realizar la acción correspondiente para la opción seleccionada
  };

  const menuOptions = ["Option 1", "Option 2", "Option 3"];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
        <Text>Open Menu</Text>
      </TouchableOpacity>

      <SideMenu
        visible={menuVisible}
        onClose={closeMenu}
        options={menuOptions}
        onSelect={handleOptionSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menu: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
});

export default Eliminar2;
