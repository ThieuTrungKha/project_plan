import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Button,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponent";

import {
  DrawerContent,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import TextComponents from "./TextComponents";
import { appColors } from "../constants/appColor";
import RowComponent from "./RowComponent";
import {
  Home,
  Home2,
  Lock,
  Logout,
  More,
  Star,
  Star1,
} from "iconsax-react-native";
import SectionCOmponent from "./SectionComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { appInfo } from "../constants/appInfo";
import { HomeScreens } from "../screens";
import SpaceComponent from "./SpaceComponent";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { removeAuth } from "../redux/reducers/authReducer";
import ClientService from "../apis/service";
import { useFocusEffect } from "@react-navigation/native";
import { ImageBackground } from "react-native";

interface Plan {
  statusPlan: boolean;
  planName: string;
}

interface User {
  username: string;
  photoUrl?: string;
  email: string;
}

const CustomDrawer = (props: any) => {
  const { navigation } = props;
  const [isClick, setIsClick] = useState(false);
  const [planData, setPlanData] = useState<Plan[]>([]);
  const [user, setUser] = useState<User>();
  const [image, setImage] = useState<string | null>(null);

  const dispatch = useDispatch();

  const getListCompletedPlan = async () => {
    const res = await ClientService.service("/plan/getPlan", undefined, "get");
    setPlanData(res.data);
    setImage(user?.photoUrl || "");
  };

  const getDataUser = async () => {
    const res = await ClientService.service("/user/getUser", undefined, "get");
    setUser(res.data);
  };

  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        getListCompletedPlan();
      }, 2000);
      getDataUser();

      return () => {
        clearTimeout(timeout);
      };
    }, []),
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView
        style={[{ flex: 1 }, { paddingTop: StatusBar.currentHeight }]}
      >
        <SectionCOmponent
          styles={{
            backgroundColor: appColors.primary,
            height: appInfo.sizes.HEIGHT * 0.2,
            marginTop: 0,
          }}
        >
          <ImageBackground
            source={image ? { uri: image } : require("../assets/img/image.png")}
            style={{ width: 50, height: 50, marginTop: 20 }}
            imageStyle={{ borderRadius: 70 }}
          />
          <TextComponents
            styles={{ paddingTop: 10, fontWeight: 600, fontSize: 20 }}
            text={user?.username || ""}
            color={appColors.white}
          />
          <TextComponents text={user?.email || ""} color={appColors.white} />
        </SectionCOmponent>

        <View style={{ backgroundColor: appColors.white, margin: 0 }}>
          <View
            style={{
              height: 0.5,
              backgroundColor: appColors.boderColor,
              width: "100%",
            }}
          />
          <DrawerItemList {...props} />
          <View
            style={{
              height: 0.5,
              backgroundColor: appColors.boderColor,
              width: "100%",
              marginBottom: 15,
            }}
          />
          <SectionCOmponent>
            <TextComponents
              text="Danh sách kế hoạch đã hoàn thành"
              color={appColors.textColor}
              styles={{ fontWeight: 700, fontSize: 16, paddingTop: 0 }}
            />
            <SpaceComponent height={5} />
            {planData?.map((item: any, index: any) => {
              if (item.statusPlan == true) {
                return (
                  <ButtonComponent
                    key={index}
                    text={item.planName}
                    textStyle={{ fontSize: 18, paddingLeft: 10 }}
                    type="text"
                    iconLeft={<Star1 size={18} color={appColors.highlight} />}
                    iconRight={
                      <Icon
                        name="more-vert"
                        size={28}
                        color={appColors.iconColor}
                      />
                    }
                    textColor={
                      isClick ? appColors.primary : appColors.textColor
                    }
                  />
                );
              }
            })}
          </SectionCOmponent>
        </View>
        <TextComponents
          text={"________________________________________________"}
          color={appColors.boderColor}
        />
        <SectionCOmponent>
          <ButtonComponent
            text="Đổi thông tin mật khẩu"
            styles={{ justifyContent: "flex-start" }}
            textStyle={{
              fontSize: 18,
              paddingLeft: 10,
              color: appColors.textColor,
            }}
            type="text"
            iconLeft={
              <Icon name="lock-reset" size={24} color={appColors.iconColor} />
            }
            textColor={isClick ? appColors.primary : appColors.textColor}
            onPress={() => {
              navigation.navigate("ChangePassword");
            }}
          />
          <ButtonComponent
            onPress={() => {
              navigation.navigate("UpdateInfoUser");
            }}
            text="Đổi thông tin tài khoản"
            styles={{ justifyContent: "flex-start" }}
            textStyle={{ fontSize: 18, paddingLeft: 10 }}
            type="text"
            iconLeft={
              <Icon1
                name="account-edit"
                size={24}
                color={appColors.iconColor}
              />
            }
            textColor={isClick ? appColors.primary : appColors.textColor}
          />
          <ButtonComponent
            text="Đăng xuất"
            styles={{ justifyContent: "flex-start" }}
            textStyle={{ fontSize: 18, paddingLeft: 10, color: "red" }}
            type="text"
            iconLeft={<Icon1 name="logout" size={24} color="red" />}
            textColor={isClick ? appColors.primary : appColors.textColor}
            onPress={async () => {
              await AsyncStorage.clear();
              dispatch(removeAuth({}));
            }}
          />
        </SectionCOmponent>
      </SafeAreaView>
    </ScrollView>
  );
};

export default CustomDrawer;
