import { View, Text, StyleProp, TextStyle, Platform } from 'react-native'
import React from 'react'
import { appColors } from '../constants/appColor'
interface Props {
    text: string,
    color?: string,
    size?: number,
    flex?: number,   
    styles?: StyleProp<TextStyle>,
    title?: boolean
}
const TextComponents = (props: Props) => {
    const { text, color, size, flex, styles,title } = props
    const fontSizeDefaut = Platform.OS === 'ios' ? 24 : 16
  return (
    <View>
      <Text style = {
        [{
            color: color ?? appColors.textColor,
            flex: flex ?? 0,
            fontSize: size ?? title ? 24 : fontSizeDefaut,
            
        }, styles]
      }>{text}</Text>
    </View>
  )
}

export default TextComponents