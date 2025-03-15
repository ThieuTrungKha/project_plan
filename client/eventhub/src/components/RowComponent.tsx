import { View, Text, StyleProp, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { globalStyles } from "./../styles/globalStyle";

interface Props {
  justify?:
    | "space-between"
    | "center"
    | "flex-end"
    | "flex-start"
    | "space-around"
    | "space-evenly";
  stylles?: StyleProp<ViewStyle>;
  children: ReactNode;
  align?: "center" | "flex-end" | "flex-start" | "baseline" | "stretch";
}
const RowComponent = (props: Props) => {
  const { justify, stylles, align, children } = props;
  return (
    <View
      style={[
        globalStyles.row,
        { justifyContent: justify, alignItems: align },
        stylles,
      ]}
    >
      {children}
    </View>
  );
};

export default RowComponent;
