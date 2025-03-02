import { View, Text, Modal, TextComponent, ActivityIndicator } from 'react-native'
import React from 'react'
import { globalStyles } from './../styles/globalStyle';
import TextComponents from './../components/TextComponents';
import { appColors } from '../constants/appColor';
interface LoadingModalProps {
  visible: boolean,
  message?: string,
}
const LoadingModal = (props: LoadingModalProps) => {
  const {visible, message} = props
  return (
    <Modal visible={visible} style={[globalStyles.container]} transparent statusBarTranslucent>
        <View style={
          {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }
        } >
          <ActivityIndicator color={appColors.white} size={32} />
            <TextComponents text="Loading..." flex={0} color={appColors.white}/>
        </View>
    </Modal>
  )
}

export default LoadingModal