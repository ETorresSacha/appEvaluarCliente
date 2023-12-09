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
import Alert from "../views/alert/Alert";

//const Tab = createBottomTabNavigator();
const optionsStack = {
  statusBarColor: "rgb(31, 36, 36)",
  //title: "Clientes",
  headerStyle: {
    backgroundColor: "rgb(31, 36, 36)",
  },
  headerTintColor: "white",
  headerTitleAlign: "center",
};

const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Cliente"
          component={Customer}
          options={optionsStack}
        />
        <Stack.Screen
          name="Calculadora"
          component={Calculator}
          options={optionsStack}
        />
        <Stack.Screen name="Cronograma" component={VerCronograma} />
        <Stack.Screen
          name="Nuevo cliente"
          component={NewForm}
          options={optionsStack}
        />
        <Stack.Screen
          name="Detalle"
          component={Detail}
          options={optionsStack}
        />
        <Stack.Screen name="Alerta" component={Alert} options={optionsStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
