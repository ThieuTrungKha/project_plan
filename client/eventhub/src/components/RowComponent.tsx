import { View, Text, StyleProp,ViewStyle } from 'react-native'
import React ,{ReactNode} from 'react'
import { globalStyles } from './../styles/globalStyle';

interface Props{
    justify?: 'space-between' | 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-evenly',
    stylles?: StyleProp<ViewStyle>,
    children: ReactNode
}
const RowComponent = (props: Props) =>{
    const {justify, stylles, children} = props
  return (
    <View style={[globalStyles.row,{justifyContent: justify}, stylles]}>
      {children}
    </View>
  )
}

export default RowComponent