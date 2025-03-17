import { View, Text, Button, Image, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonComponent from "../../components/ButtonComponent";
import { globalStyles } from "../../styles/globalStyle";
import InputComponent from "../../components/InputComponent";
import { Sms, Lock, User, Verify } from "iconsax-react-native";
import { appColors } from "../../constants/appColor";
import ContainerComponent from "../../components/ContainerComponent";
import SectionComponent from "../../components/SectionComponent";
import TextComponents from "../../components/TextComponents";
import { SpaceComponent } from "../../components";
import { useHandler } from "react-native-reanimated";
import RowComponent from "../../components/RowComponent";
import SectionCOmponent from "../../components/SectionComponent";
import SocialLogin from "./components/SocialLogin";
import LoginScreens from "./LoginScreens";
import LoadingModal from "../../modals/LoadingModal";
import authenticationApi from "../../apis/authApi";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/reducers/authReducer";
import { Validate } from "../../utils/Validate";
import Verication from "./Verication";

interface ErrorMessage {
  email: string;
  password: string;
  confirmPassword: string;
}
const initValue = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpScreens = ({ navigation }: any) => {
  const [values, setValues] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (
      !errorMessage ||
      (errorMessage &&
        (errorMessage.email ||
          errorMessage.password ||
          errorMessage.confirmPassword)) ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [errorMessage, values]);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = { ...values };
    data[`${key}`] = value;
    setValues(data);
  };

  const formValidation = (key: string) => {
    const data = { ...errorMessage };
    let message = "";
    switch (key) {
      case "email":
        if (!values.email) {
          message = "Email is required";
        } else if (!Validate.email(values.email)) {
          message = "Invalid email address";
        } else {
          message = "";
        }
        break;

      case "password":
        message = !values.password ? "Password is required" : "";
        break;

      case "confirmPassword":
        if (!values.confirmPassword) {
          message = "Confirm password is required";
        } else if (values.password !== values.confirmPassword) {
          message = "Password and confirm password do not match";
        } else {
          ("");
        }
        break;
    }

    data[`${key}`] = message;
    setErrorMessage(data);
  };
  console.log("isDisabled", isDisabled);

  const handleSignUp = async () => {
    const api = `/verify`;
    try {
      const res = await authenticationApi.HandleAuthentication(
        api,
        { email: values.email },
        "post",
      );
      navigation.navigate("Verication", {
        code: res.data.code,
        email: values.email,
        password: values.password,
        username: values.username,
      });
    } catch (error) {
      setErrorMessage("Email already exists");
      console.log("error:", error);
    }
  };
  return (
    <ContainerComponent isImageBackground isScroll back>
      <SectionComponent>
        <TextComponents text="Sign up" size={24} styles={{ fontWeight: 500 }} />
        <SpaceComponent height={21} />
        <InputComponent
          value={values.username}
          placeholder="full name"
          onChange={(val) => handleChangeValue("username", val)}
          allowClear
          affix={<User size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={values.email}
          placeholder="Email"
          onChange={(val) => handleChangeValue("email", val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
          onEnd={() => formValidation("email")}
        />
        <InputComponent
          value={values.password}
          placeholder="Password"
          onChange={(val) => handleChangeValue("password", val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
          onEnd={() => formValidation("password")}
        />
        <InputComponent
          value={values.confirmPassword}
          placeholder="Confirm Password"
          onChange={(val) => handleChangeValue("confirmPassword", val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
          onEnd={() => formValidation("confirmPassword")}
        />
      </SectionComponent>
      {errorMessage && (
        <SectionComponent>
          <RowComponent>
            {Object.keys(errorMessage).map((error, index) => (
              <TextComponents
                text={errorMessage[error]}
                key={`error${index}`}
                color="red"
              />
            ))}
          </RowComponent>
        </SectionComponent>
      )}
      <SpaceComponent height={16} />
      <SectionCOmponent>
        <ButtonComponent
          text="SIGN UP"
          type="primary"
          onPress={handleSignUp}
          disabled={isDisabled}
        />
      </SectionCOmponent>
      <SocialLogin />
      <SectionCOmponent>
        <RowComponent justify="center">
          <TextComponents text="Don’t have an account?" />
          <ButtonComponent
            text=" Sign in"
            type="link"
            onPress={() => {
              navigation.navigate("LoginScreens");
            }}
          />
        </RowComponent>
      </SectionCOmponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default SignUpScreens;
