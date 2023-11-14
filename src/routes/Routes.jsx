import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../views/home/Home";
import Detail from "../views/detail/Detail";
import NewForm from "../views/newForm/NewForm";

const Tab = createBottomTabNavigator();
//const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer style={{ backgroundColor: "blue" }}>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Nuevo" component={NewForm} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
