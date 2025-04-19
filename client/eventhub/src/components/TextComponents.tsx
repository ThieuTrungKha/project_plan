import { View, Text, StyleProp, TextStyle, Platform } from "react-native";
import React from "react";
import { appColors } from "../constants/appColor";
interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
  testId?: string;
}
const TextComponents = (props: Props) => {
  const { text, color, size, flex, styles, title, testId } = props;
  return (
    <View>
      <Text
        testID={testId}
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[
          {
            color: color ?? appColors.textColor,
            flex: flex ?? 0,
            fontSize: size ?? (title ? 24 : size),
          },
          styles,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default TextComponents;
