import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Button,
} from "react-native";
import React, { useState } from "react";
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

const CustomDrawer = (props: any) => {
  const { navigation } = props;
  const [isClick, setIsClick] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsClick((prev) => !prev);
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView
        style={[{ flex: 1 }, { paddingTop: StatusBar.currentHeight }]}
      >
        <SectionCOmponent
          styles={{
            backgroundColor: appColors.primary,
            height: 150,
            marginTop: 0,
          }}
        >
          <Image
            source={require("../assets/img/image.png")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              marginTop: 10,
            }}
          />
          <TextComponents
            styles={{ paddingTop: 10, fontWeight: 600, fontSize: 20 }}
            text="kha"
            color={appColors.white}
          />
          <TextComponents text="kha@gmail.com" color={appColors.white} />
        </SectionCOmponent>

        <View style={{ backgroundColor: appColors.white, margin: 0 }}>
          <TextComponents
            text={"________________________________________________"}
            color={appColors.boderColor}
            styles={{ paddingBottom: 10 }}
          />
          <DrawerItemList {...props} />
          <TextComponents
            text={"________________________________________________"}
            color={appColors.boderColor}
          />
          <SectionCOmponent>
            <TextComponents
              text="Danh sách kế hoạch đánh dấu sao"
              color={appColors.textColor}
              styles={{ fontWeight: 700, fontSize: 16, paddingTop: 0 }}
            />
            <SpaceComponent height={5} />
            <ButtonComponent
              text="danh sách 1"
              textStyle={{ fontSize: 18, paddingLeft: 10 }}
              type="text"
              iconLeft={<Star1 size={18} color={appColors.highlight} />}
              iconRight={
                <Icon name="more-vert" size={28} color={appColors.iconColor} />
              }
              textColor={isClick ? appColors.primary : appColors.textColor}
              onPress={() => navigation.navigate("LoginScreens")}
            />
            <ButtonComponent
              text="danh sách 1"
              textStyle={{ fontSize: 18, paddingLeft: 10 }}
              type="text"
              iconLeft={<Star1 size={18} color={appColors.highlight} />}
              iconRight={
                <Icon name="more-vert" size={28} color={appColors.iconColor} />
              }
              textColor={isClick ? appColors.primary : appColors.textColor}
              onPress={() => handleClick()}
            />
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
            onPress={() => handleClick()}
          />
          <ButtonComponent
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
            onPress={() => handleClick()}
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
