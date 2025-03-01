import { View, Text, StyleProp, ViewStyle, TextComponent,TouchableOpacity } from 'react-native'
import React, {ReactNode} from 'react'
import TextComponents from './TextComponents'
import { globalStyles } from '../styles/globalStyle'
import { appColors } from '../constants/appColor'
interface Props {
    icon?: ReactNode,
    text: string,
    type?: 'primary' | 'text' | 'link',
    color?: string,
    styles?: StyleProp<ViewStyle>
    textColor?: string,
    textStyle?: StyleProp<ViewStyle>,
    onPress?: () => void,
    iconFlex?: 'right' | 'left'
}
const ButtonComponent = (props: Props) => {
    const { icon, text, type, color, styles, textColor, onPress, iconFlex, textStyle} = props
  return type === 'primary' ? (

    <TouchableOpacity 
    
        onPress={onPress}
        style={[
        globalStyles.button,
        globalStyles.shadow,

        {
            backgroundColor: color ?? appColors.primary,
            marginBottom: 20
        }
        ]} >
        {icon  && iconFlex === 'left' && icon}
        <TextComponents 
        text = {text} 
        color={textColor ?? appColors.white} 
        styles={[
            textStyle,
            {
                marginLeft: icon ? 12 : 0,
                fontSize: 16,
                textAlign: 'center'
            }
        ]}   
        flex={icon && iconFlex === 'right' ? 1 : 0}       
         />
        {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress} >
        <TextComponents text = {text} color= {type === 'link' ? appColors.primary : appColors.textColor} />
    </TouchableOpacity>
  )
}

export default ButtonComponent