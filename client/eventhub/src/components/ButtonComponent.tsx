import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextComponent,
  TouchableOpacity,
  TextStyle,
} from "react-native";
import React, { ReactNode } from "react";
import TextComponents from "./TextComponents";
import { globalStyles } from "../styles/globalStyle";
import { appColors } from "../constants/appColor";
import { Home2 } from "iconsax-react-native";
import RowComponent from "./RowComponent";
interface Props {
  icon?: ReactNode;
  text: string;
  type?: "primary" | "text" | "link";
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  iconFlex?: "right" | "left";
  disabled?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}
const ButtonComponent = (props: Props) => {
  const {
    icon,
    text,
    type,
    color,
    styles,
    textColor,
    onPress,
    iconFlex,
    textStyle,
    disabled,
    iconLeft,
    iconRight,
  } = props;
  return type === "primary" ? (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        globalStyles.button,
        globalStyles.shadow,

        {
          backgroundColor: color
            ? color
            : disabled
              ? appColors.gray
              : appColors.primary,
          marginBottom: 20,
        },
      ]}
    >
      {icon && iconFlex === "left" && icon}
      <TextComponents
        text={text}
        color={textColor ?? appColors.white}
        styles={[
          textStyle,
          {
            marginLeft: icon ? 12 : 0,
            fontSize: 16,
            textAlign: "center",
          },
        ]}
        flex={icon && iconFlex === "right" ? 1 : 0}
      />
      {icon && iconFlex === "right" && icon}
    </TouchableOpacity>
  ) : type === "text" ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 5,
          paddingTop: 10,
          marginTop: 5,
        },
        styles,
      ]}
    >
      <RowComponent>
        {iconLeft && iconLeft}
        <TextComponents
          text={text}
          color={textColor}
          styles={[{ flex: 0, textAlign: "center" }, textStyle]}
        />
      </RowComponent>
      {iconRight && iconRight}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <TextComponents
        text={text}
        color={type === "link" ? appColors.primary : textColor}
        styles={textStyle}
      />
    </TouchableOpacity>
  );
};

export default ButtonComponent;
