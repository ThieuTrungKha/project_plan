import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { appColors } from "../../constants/appColor";
import { appInfo } from "../../constants/appInfo";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ImageBackground } from "react-native";
import { ButtonComponent, TextComponents } from "../../components";
import { TextInput } from "react-native-gesture-handler";
import ClientService from "../../apis/service";

interface UserInfoProps {
  username: string;
  photoUrl?: string;
  email: string;
}

const testCode = () => {
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
    console.log(res.data);
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

export default testCode;
