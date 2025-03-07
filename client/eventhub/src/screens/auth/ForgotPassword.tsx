import { View, Text, TextComponent, Alert } from "react-native";
import React, { useState } from "react";
import ContainerComponent from "../../components/ContainerComponent";
import SectionCOmponent from "../../components/SectionComponent";
import TextComponents from "./../../components/TextComponents";
import { InputComponent, SpaceComponent } from "../../components";
import { Arrow, ArrowRight, Sms } from "iconsax-react-native";
import { appColors } from "../../constants/appColor";
import ButtonComponent from "./../../components/ButtonComponent";
import { Validate } from "../../utils/Validate";
import LoadingModal from "../../modals/LoadingModal";
import authenticationApi from "../../apis/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  const handlecheckEmail = () => {
    const isValidEmail = Validate.email(email);
    setIsDisabled(!isValidEmail);
  };
  const handleForgotPassword = async () => {
    const api = `/forgotPassword`;
    setisLoading(true);
    try {
      const res: any = await authenticationApi.HandleAuthentication(
        api,
        { email },
        "post",
      );
      console.log(res);
      Alert.alert("we send a mail include new password to your email");
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.log(`can not create new password api forgot password, ${error}`);
    }
  };
  return (
    <ContainerComponent back isImageBackground>
      <SectionCOmponent>
        <TextComponents
          text="Resset Password"
          title
          styles={{ fontWeight: 400 }}
        />
        <TextComponents text="Please enter your email address to request a password reset" />
        <SpaceComponent height={26} />
        <InputComponent
          value={email}
          onChange={(val) => setEmail(val)}
          affix={<Sms size={20} color={appColors.gray} />}
          placeholder="abc@gmail.com"
          onEnd={handlecheckEmail}
        />
      </SectionCOmponent>
      <SectionCOmponent>
        <ButtonComponent
          onPress={handleForgotPassword}
          disabled={isDisabled}
          text="SEND"
          type="primary"
          icon={<ArrowRight size={28} color={appColors.white} />}
          textStyle={{}}
        />
      </SectionCOmponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default ForgotPassword;
