import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import DrawerNavigation from "./DrawerNavigation";
import HomeScreens from "../home/HomeScreens";
import LoginScreens from "../auth/LoginScreens";
import CreatePlan from "../main/CreatePlan";

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      <Stack.Screen name="HomeScreens" component={HomeScreens} />
      <Stack.Screen name="CreatePlan" component={CreatePlan} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
