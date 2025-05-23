import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from './../styles/globalStyle';
interface Props{
    children: ReactNode,
    styles?: StyleProp<ViewStyle>
}
const SectionCOmponent = (props: Props) => {
    const { children, styles } = props;
  return (
    <View style={[globalStyles.section, styles]}>
      {children}
    </View>
  )
}

export default SectionCOmponent