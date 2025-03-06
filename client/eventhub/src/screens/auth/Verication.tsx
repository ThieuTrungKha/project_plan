import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ContainerComponent from "../../components/ContainerComponent";
import SectionCOmponent from "../../components/SectionComponent";
import {
  ButtonComponent,
  SpaceComponent,
  TextComponents,
} from "../../components";
import RowComponent from "../../components/RowComponent";
import { appColors } from "../../constants/appColor";
import authenticationApi from "../../apis/authApi";
import LoadingModal from "../../modals/LoadingModal";

const Verication = ({ navigation, route }: any) => {
  const { code, email, password, username } = route.params;

  const [currentCode, setCurrentCode] = useState(code);

  const [codeValue, setCodeValue] = useState<string[]>([]);
  const [newCode, setNewCode] = useState("");
  const [limit, setLimit] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();

  const handleChangeCode = (val: string, index: number) => {
    const data = [...codeValue];
    data[index] = val;
    setCodeValue(data);
  };

  useEffect(() => {
    ref1.current.focus();
  }, []);

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        limit > 0 && setLimit((limit) => limit - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [limit]);

  useEffect(() => {
    let item = "";
    codeValue.forEach((val) => {
      item += val;
      setNewCode(item);
    });
    console.log(item);
  }, [codeValue]);

  const handleResendVerrification = async () => {
    setCodeValue(["", "", "", ""]);
    setNewCode("");
    const api = `/verify`;
    setIsLoading(true);
    try {
      const res: any = await authenticationApi.HandleAuthentication(
        api,
        { email },
        "post",
      );
      setLimit(60);
      console.log(res);
      setCurrentCode(res.data.code);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(`can not send verification code ${error}`);
    }
  };
  const handleVerification = async () => {
    if (limit > 0) {
      console.log("code", newCode);
      console.log("current code", currentCode);
      if (String(newCode) !== String(currentCode)) {
        console.log("Code incorrect");
      } else {
        console.log("Code correct");
        setErrorMessage("");
        const api = `/register`;
        const data = {
          email,
          password,
          username,
        };
        try {
          const res: any = await authenticationApi.HandleAuthentication(
            api,
            data,
            "post",
          );
          console.log(res);
        } catch (error) {
          console.log(`can not send verification code ${error}`);
        }
      }
    } else {
      setErrorMessage("Please wait for the code to be sent");
    }
  };
  return (
    <ContainerComponent back isImageBackground isScroll>
      <SectionCOmponent>
        <TextComponents
          text="Verification"
          title
          styles={{ fontWeight: 400 }}
        />
        <TextComponents text={`We are send you the verification on ${email}`} />
        <SpaceComponent height={26} />
        <RowComponent stylles={{ justifyContent: "space-between" }}>
          <TextInput
            value={codeValue[0]}
            keyboardType="number-pad"
            ref={ref1}
            style={[styles.input]}
            placeholder="-"
            maxLength={1}
            onChangeText={(val) => {
              handleChangeCode(val, 0);
              val.length > 0 && ref2.current.focus();
            }}
          />
          <TextInput
            value={codeValue[1]}
            keyboardType="number-pad"
            ref={ref2}
            style={[styles.input]}
            placeholder="-"
            maxLength={1}
            onChangeText={(val) => {
              handleChangeCode(val, 1);
              val.length > 0 && ref3.current.focus();
            }}
          />
          <TextInput
            value={codeValue[2]}
            keyboardType="number-pad"
            ref={ref3}
            style={[styles.input]}
            placeholder="-"
            maxLength={1}
            onChangeText={(val) => {
              handleChangeCode(val, 2);
              val.length > 0 && ref4.current.focus();
            }}
          />
          <TextInput
            value={codeValue[3]}
            keyboardType="number-pad"
            ref={ref4}
            style={[styles.input]}
            placeholder="-"
            maxLength={1}
            onChangeText={(val) => {
              handleChangeCode(val, 3);
            }}
          />
        </RowComponent>
      </SectionCOmponent>
      <SectionCOmponent styles={{ marginTop: 40 }}>
        <ButtonComponent
          disabled={newCode.length === 4 ? false : true}
          onPress={handleVerification}
          text="Continue"
          type="primary"
        />
      </SectionCOmponent>
      {errorMessage && (
        <SectionCOmponent>
          <TextComponents
            text={errorMessage}
            color="red"
            styles={{ textAlign: "center" }}
          />
        </SectionCOmponent>
      )}
      <SectionCOmponent styles={{ alignItems: "center" }}>
        {limit > 0 ? (
          <RowComponent stylles={{ justifyContent: "center" }}>
            <TextComponents text="Re-send code in " />
            <TextComponents text={`00:${limit}`} color={appColors.primary} />
          </RowComponent>
        ) : (
          <ButtonComponent
            type="link"
            text="Re-send code"
            onPress={handleResendVerrification}
          />
        )}
      </SectionCOmponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default Verication;
const styles = StyleSheet.create({
  input: {
    height: 55,
    width: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dadada",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 24,
  },
});
