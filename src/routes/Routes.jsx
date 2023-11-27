import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../views/home/Home";
import Detail from "../views/detail/Detail";
import NewForm from "../views/newForm/NewForm";

import VerCronograma from "../views/cronograma/VerCronograma";
import Customer from "../views/customer/Customer";
import Calculator from "../views/calculator/Calculator";

//const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer style={{ backgroundColor: "blue" }}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cliente" component={Customer} />
        <Stack.Screen name="Calculadora" component={Calculator} />
        <Stack.Screen name="Cronograma" component={VerCronograma} />
        <Stack.Screen name="Nuevo cliente" component={NewForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
