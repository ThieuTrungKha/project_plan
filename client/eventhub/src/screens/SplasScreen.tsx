import { View, Text, ImageBackground, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { appInfo } from '../constants/appInfo'
import { SpaceComponent } from '../components'
import { appColors } from './../constants/appColor';

const SplasScreen = () => {
  return (
    
      <ImageBackground source={require('../assets/img/background.png')} style={{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'}} imageStyle={{flex:1}}>
            <Image source={require('../assets/img/branding.png')} 
                   style={{
                      width: appInfo.sizes.WIDTH * 0.8,
                      resizeMode: 'contain'
                   }} />
            <SpaceComponent height={20} />
            <ActivityIndicator color={appColors.boderColor} size={22} />
      </ImageBackground>
    
  )
}

export default SplasScreen