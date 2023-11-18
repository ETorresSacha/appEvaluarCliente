import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
//import CheckBox  from "react-native-check-box";

const OptionsSure = () => {
  const [isCheked, setIsChecked] = useState(false);
  return (
    <Text>hola eleige</Text>
    // <CheckBox
    //   rightText="seguro"
    //   rightTextStyle={{
    //     fontSize: 19,
    //     color: isCheked.SegDesgravamen ? "green" : "black",
    //   }}
    //   style={{ flex: 1, padding: 10 }}
    //   isChecked={isCheked.SegDesgravamen}
    //   onClick={() =>
    //     setIsChecked({
    //       ...isCheked,
    //       SegDesgravamen: !isCheked.SegDesgravamen,
    //     })
    //   }
    //   checkedCheckBoxColor="green"
    //   uncheckedCheckBoxColor="black"
    // />
  );
};

export default OptionsSure;

const styles = StyleSheet.create({});
