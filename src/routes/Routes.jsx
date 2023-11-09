import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../views/home/Home";

const Tab = createBottomTabNavigator();
//const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer style={{ backgroundColor: "blue" }}>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="AddCalorias" component={AddFood} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
