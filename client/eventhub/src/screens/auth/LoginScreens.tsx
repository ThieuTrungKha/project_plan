import {
  View,
  Text,
  Button,
  Image,
  TextComponent,
  Switch,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonComponent from "./../../components/ButtonComponent";
import InputComponent from "./../../components/InputComponent";
import { Sms, Lock } from "iconsax-react-native";
import { appColors } from "../../constants/appColor";
import ContainerComponent from "../../components/ContainerComponent";
import SectionComponent from "../../components/SectionComponent";
import TextComponents from "./../../components/TextComponents";
import { SpaceComponent } from "../../components";
import { useHandler } from "react-native-reanimated";
import RowComponent from "./../../components/RowComponent";
import SectionCOmponent from "./../../components/SectionComponent";
import SocialLogin from "./components/SocialLogin";
import authenticationApi from "../../apis/authApi";
import { Validate } from "../../utils/Validate";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/reducers/authReducer";

const LoginScreens = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(true);
  const [isDisable, setIsDisable] = useState(true);

  const dispacth = useDispatch();

  useEffect(() => {
    const emailValidation = Validate.email(email);

    if (!email || !password || !emailValidation) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  const handleLogin = async () => {
    const emailValidation = Validate.email(email);
    if (emailValidation) {
      try {
        const res = await authenticationApi.HandleAuthentication(
          "/login",
          {
            email: email,
            password: password,
          },
          "post",
        );
        dispacth(addAuth(res.data));
        await AsyncStorage.setItem(
          "auth",
          isRemember ? JSON.stringify(res.data) : email,
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Error", "Please enter a valid email");
    }
  };
  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 75,
          marginBottom: 30,
        }}
      >
        <Image
          source={require("../../assets/img/logo.png")}
          style={{ width: 162, height: 114 }}
        />
      </SectionComponent>

      <SectionComponent>
        <TextComponents text="Sign in" size={24} styles={{ fontWeight: 500 }} />
        <SpaceComponent height={21} />
        <InputComponent
          value={email}
          placeholder="email"
          onChange={(val) => setEmail(val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={password}
          placeholder="Password"
          onChange={(val) => setPassword(val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
        <RowComponent justify="space-between">
          <RowComponent>
            <Switch
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
              trackColor={{ true: appColors.primary }}
              thumbColor={appColors.white}
            />
            <SpaceComponent height={4} />
            <Text>Remember me</Text>
          </RowComponent>
          <ButtonComponent
            text="Forgot password?"
            onPress={() => navigation.navigate("ForgotPassword")}
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionCOmponent>
        <ButtonComponent
          disabled={isDisable}
          text="SIGN IN"
          type="primary"
          onPress={() => handleLogin()}
        />
      </SectionCOmponent>
      <SocialLogin />
      <SectionCOmponent>
        <RowComponent justify="center">
          <TextComponents text="Don’t have an account?" />
          <ButtonComponent
            text=" Sign up"
            type="link"
            onPress={() => {
              navigation.navigate("SignUpScreens");
            }}
          />
        </RowComponent>
      </SectionCOmponent>
    </ContainerComponent>
  );
};

export default LoginScreens;
