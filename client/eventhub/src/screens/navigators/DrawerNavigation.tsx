import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreens from "../home/HomeScreens";
import { appColors } from "../../constants/appColor";
import { Home, Home2, Lock, Sms } from "iconsax-react-native";
import CustomDrawer from "../../components/CustomDrawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePlan from "../main/CreatePlan";
import DetailPlanScreen from "../main/DetailPlanScreen";
import testCode from "../main/testCode";
import DetailTask from "../main/DetailTask";
import UpdateInfoUser from "../main/UpdateInfoUser";
import Icon from "react-native-vector-icons/Ionicons";
import { appInfo } from "../../constants/appInfo";

const DrawerNavigation = ({ navigation }: any) => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerItemStyle: {
          borderRadius: 0,
        },
      }}
    >
      <Drawer.Screen
        options={{
          drawerLabel: "Home",
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: appColors.primary,
                }}
              >
                Kế hoạch
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("NotificationScreen")}
              >
                <Icon
                  name="notifications"
                  size={24}
                  color={appColors.primary}
                  style={{ paddingLeft: appInfo.sizes.WIDTH * 0.5 }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTintColor: appColors.primary,
          drawerActiveTintColor: appColors.primary,

          drawerIcon: () => {
            return <Home2 size={22} color={appColors.gray} />;
          },
        }}
        name="HomeScreens"
        component={HomeScreens}
      />
      {/* <Drawer.Screen
        options={{
          drawerLabel: "Detail Plan",
          headerShown: false,
          headerTitle: "Tạo Kế hoạch",
          headerTintColor: appColors.primary,
          drawerActiveTintColor: appColors.primary,
          drawerIcon: () => {
            return <Home2 size={22} color={appColors.gray} />;
          },
        }}
        name="DetailPlanScreen"
        component={DetailPlanScreen}
      />
      <Drawer.Screen
        options={{
          drawerLabel: " chi tiết nhiệm vụ",
          headerShown: false,
          headerTitle: "chi tiết nhiệm vụ",
          headerTintColor: appColors.primary,
          drawerActiveTintColor: appColors.primary,

          drawerIcon: () => {
            return <Home2 size={22} color={appColors.gray} />;
          },
        }}
        name="DetailTask"
        component={DetailTask}
      /> */}
      {/* <Drawer.Screen
        name="CreatePlan"
        component={CreatePlan}
        options={{ drawerItemStyle: { height: 0 }, headerShown: false }}
      /> */}
      <Drawer.Screen
        options={{
          drawerLabel: "test code",
          headerShown: true,
          headerTitle: "test code",
          headerTintColor: appColors.primary,
          drawerActiveTintColor: appColors.primary,

          drawerIcon: () => {
            return <Home2 size={22} color={appColors.gray} />;
          },
        }}
        name="testCode"
        component={testCode}
      />
      <Drawer.Screen
        options={{
          headerShown: true,
          drawerItemStyle: { height: 0 },
          headerTintColor: appColors.primary,
          headerTitle: "Cập nhật thông tin cá nhân",
        }}
        name="UpdateInfoUser"
        component={UpdateInfoUser}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
