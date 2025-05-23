import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreens from "./../home/HomeScreens";
import LoginScreens from "../auth/LoginScreens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePlan from "../main/CreatePlan";

const TabNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreens" component={HomeScreens} />
    </Stack.Navigator>
  );
};

export default TabNavigator;
