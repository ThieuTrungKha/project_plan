import { View, Text, TextComponent, Alert } from "react-native";
import React, { useState } from "react";
import ContainerComponent from "../../components/ContainerComponent";
import SectionCOmponent from "../../components/SectionComponent";
import TextComponents from "./../../components/TextComponents";
import { InputComponent, SpaceComponent } from "../../components";
import { Arrow, ArrowRight, Sms, Lock } from "iconsax-react-native";
import { appColors } from "../../constants/appColor";
import ButtonComponent from "./../../components/ButtonComponent";
import { Validate } from "../../utils/Validate";
import LoadingModal from "../../modals/LoadingModal";
import authenticationApi from "../../apis/authApi";
import ClientService from "../../apis/service";

const ForgotPassword = ({ navigation }: any) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const checkPassword = async () => {
    if (!Validate.Password(password)) {
      Alert.alert("Mật khẩu không hợp lệ");
      return;
    } else if (password !== passwordConfirm) {
      Alert.alert("Mật khẩu không khớp");
      return;
    }
    try {
      const res = await ClientService.service(
        "/user/updatePassword",
        {
          password: password,
        },
        "patch",
      );
      if (res) {
        Alert.alert("Cập nhật mật khẩu thành công");
        navigation.navigate("DrawerNavigation");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Lỗi", "Mật khẩu không chính xác.");
    }
  };

  return (
    <ContainerComponent back isImageBackground>
      <SectionCOmponent>
        <TextComponents
          text="Đổi mật khẩu mới"
          title
          styles={{ fontWeight: 400 }}
        />
        <TextComponents text="Vui lòng nhập mật khẩu mới của bạn" />
        <SpaceComponent height={26} />
        <InputComponent
          isPassword
          value={password}
          onChange={(val) => setPassword(val)}
          affix={<Lock size={20} color={appColors.gray} />}
          placeholder="Nhập mật khẩu mới"
        />
        <InputComponent
          isPassword
          value={passwordConfirm}
          onChange={(val) => setPasswordConfirm(val)}
          affix={<Lock size={20} color={appColors.gray} />}
          placeholder="Nhập lại mật khẩu mới"
        />
      </SectionCOmponent>
      <SectionCOmponent>
        <ButtonComponent
          disabled={
            Validate.Password(password) && password && passwordConfirm
              ? false
              : true
          }
          text="Tiếp tục"
          type="primary"
          icon={<ArrowRight size={28} color={appColors.white} />}
          textStyle={{}}
          onPress={checkPassword}
        />
      </SectionCOmponent>
    </ContainerComponent>
  );
};

export default ForgotPassword;
