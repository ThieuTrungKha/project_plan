import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { ReactNode } from "react";
import { EyeSlash } from "iconsax-react-native";
import { appColors } from "../constants/appColor";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import { globalStyles } from "./../styles/globalStyle";

interface Props {
  value: string;
  onChange: (value: string) => void;
  affix?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: string;
  onEnd?: () => void;
  addStyles?: StyleProp<ViewStyle>;
}

const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    affix,
    placeholder,
    suffix,
    isPassword,
    allowClear,
    type,
    onEnd,
    addStyles,
  } = props;
  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);

  return (
    <View style={[styles.inputContainer]}>
      {affix && affix}
      <TextInput
        style={[styles.input, globalStyles.text]}
        value={value}
        onChangeText={(val) => onChange(val)}
        placeholder={placeholder ?? ""}
        secureTextEntry={isShowPass}
        placeholderTextColor={"#747688"}
        onEndEditing={onEnd}
      />

      {suffix && suffix}
      <TouchableOpacity
        onPress={
          isPassword ? () => setIsShowPass(!isShowPass) : () => onChange("")
        }
      >
        {isPassword ? (
          isShowPass ? (
            <EyeSlash size={20} color={appColors.boderColor} />
          ) : (
            <AntDesign name="eye" size={20} color={appColors.textColor} />
          )
        ) : (
          value.length > 0 &&
          allowClear && (
            <AntDesign name="close" size={20} color={appColors.textColor} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.boderColor,
    width: "100%",
    alignItems: "center",
    minHeight: 56,
    justifyContent: "center",
    paddingHorizontal: 15,
    backgroundColor: appColors.white,
    marginBottom: 19,
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
    paddingHorizontal: 14,
  },
});
