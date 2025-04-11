import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import DrawerNavigation from "./DrawerNavigation";
import HomeScreens from "../home/HomeScreens";
import LoginScreens from "../auth/LoginScreens";
import CreatePlan from "../main/CreatePlan";
import DetailPlanScreen from "../main/DetailPlanScreen";
import DetailTask from "./../main/DetailTask";
import UpdateTask from "../main/UpdateTask";
import ChangePassword from "../auth/ChangePassword";
import NewPassword from "../auth/NewPassword";
import GroupScreen from "../main/GroupScreen";
import AddMemberScreen from "../main/AddMemberScreen";
import NotificationScreen from "./../main/NotificationScreen";

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      <Stack.Screen name="HomeScreens" component={HomeScreens} />
      <Stack.Screen name="CreatePlan" component={CreatePlan} />
      <Stack.Screen name="DetailPlanScreen" component={DetailPlanScreen} />
      <Stack.Screen name="DetailTask" component={DetailTask} />
      <Stack.Screen name="UpdateTask" component={UpdateTask} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="GroupScreen" component={GroupScreen} />
      <Stack.Screen name="AddMemberScreen" component={AddMemberScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
