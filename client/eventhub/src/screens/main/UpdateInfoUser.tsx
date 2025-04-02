import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextComponents } from "../../components";
import { appColors } from "../../constants/appColor";
import { appInfo } from "../../constants/appInfo";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import ClientService from "../../apis/service";
import { Alert } from "react-native";

interface UserInfoProps {
  username: string;
  photoUrl?: string;
  email: string;
}
const UpdateInfoUser = ({ navigation }: any) => {
  const [image, setImage] = useState<string | null>(null);
  const [useInfo, setUseInfo] = useState<UserInfoProps>();
  const [userNameValue, setuserNameValue] = useState("");

  const getUserInfo = async () => {
    const res = await ClientService.service("/user/getUser", undefined, "get");
    setUseInfo(res.data);
    setImage(res.data.photoUrl);
    setuserNameValue(res.data.username);
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  const updateUserInfo = async () => {
    const res = await ClientService.service(
      "/user/updateUser",
      {
        username: userNameValue,
        photoUrl: image,
      },
      "patch",
    );
    if (res) {
      Alert.alert("Cập nhật thành công");
      navigation.navigate("HomeScreens");
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("cần quyền truy cập vào thư viện ảnh");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (result.canceled !== true) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: appColors.gray1 }}>
      <View
        style={{
          backgroundColor: appColors.white,
          alignItems: "center",
          marginVertical: 10,
          height: appInfo.sizes.HEIGHT * 0.3,
          marginHorizontal: 10,
          borderRadius: 15,
        }}
      >
        {image ? (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={pickImage} style={{ marginTop: 20 }}>
              <ImageBackground
                source={
                  image
                    ? { uri: image }
                    : require("../../assets/img/background.png")
                }
                style={{ width: 80, height: 80 }}
                imageStyle={{ borderRadius: 70 }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={pickImage}
              style={{
                width: 80,
                height: 80,
                backgroundColor: appColors.gray1,
                borderRadius: 70,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Ionicons name="camera" size={40} color={appColors.white} />
            </TouchableOpacity>
          </View>
        )}
        <TextInput
          value={userNameValue}
          onChangeText={(text) => setuserNameValue(text)}
          placeholder="Nhập tên của bạn"
          placeholderTextColor={appColors.gray}
          style={{
            fontWeight: "500",
            fontSize: 18,
          }}
        />
        <TextComponents
          text={useInfo?.email || ""}
          size={16}
          color={appColors.gray}
        />{" "}
      </View>
      <TouchableOpacity
        onPress={updateUserInfo}
        style={{
          marginHorizontal: 10,
          height: appInfo.sizes.HEIGHT * 0.07,
          backgroundColor: appColors.primary,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextComponents
          text="Cập nhật thông tin cá nhân"
          size={16}
          color={appColors.white}
        />
      </TouchableOpacity>
      <View />
    </SafeAreaView>
  );
};

export default UpdateInfoUser;
