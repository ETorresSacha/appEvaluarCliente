import React, { useState } from "react";
import { View, StyleSheet, Text, Alert, Pressable } from "react-native";
import CheckBox from "react-native-check-box";

const CheckBoxs = () => {
  const [isCheked, setIsChecked] = useState({
    SegDesgravamen: false,
    itf: false,
    otro: false,
  });
  return (
    <View>
      <CheckBox
        rightText="seguro"
        rightTextStyle={{
          fontSize: 19,
          color: isCheked.SegDesgravamen ? "green" : "black",
        }}
        style={{ flex: 1, padding: 10 }}
        isChecked={isCheked.SegDesgravamen}
        onClick={() =>
          setIsChecked({
            ...isCheked,
            SegDesgravamen: !isCheked.SegDesgravamen,
          })
        }
        checkedCheckBoxColor="green"
        uncheckedCheckBoxColor="black"
      />
    </View>
  );
};

export default CheckBoxs;

const styles = StyleSheet.create({});
