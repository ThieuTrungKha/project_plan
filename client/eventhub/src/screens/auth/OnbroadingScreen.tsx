import { View, Text,Image, StyleSheet, TextComponent } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyle' 
import Swiper from 'react-native-swiper'
import { appColors } from '../../constants/appColor'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TextComponents from '../../components/TextComponents'

const OnbroadingScreen = ({navigation}:any) => {
  const [index, setIndex] = useState(0)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={[globalStyles.container]}>
      <Swiper loop={false} onIndexChanged={(num) => setIndex(num)} index={index} activeDot={<View style={{backgroundColor: appColors.white, width: 8, height: 8, borderRadius: 4, margin: 3}} />} >
        <Image 
        source={require('../../assets/img/onboarding1.png')} 
        style={
          {
            flex: 1,
             width: '100%',
            height: '100%'
            
          }
        }
        />
        <Image 
        source={require('../../assets/img/onboarding2.png')} 
        style={
          {
            flex: 1,
             width: '100%',
            height: '100%'
            
          }
        }
        />
            <Image 
        source={require('../../assets/img/onboarding3.png')} 
        style={
          {
            flex: 1,
             width: '100%',
            height: '100%'
            
          }
        }
        />
      </Swiper>
      <View
        style={[
          {
            paddingHorizontal: 20,
            paddingVertical: 20,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreens')} >
        <TextComponents text='Skip' color= {appColors.white}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreens')} >
        <TextComponents text='Next' color= {appColors.white}/>
        </TouchableOpacity>
      </View>
    </View>
    </GestureHandlerRootView>

  )
}

export default OnbroadingScreen

const styles = StyleSheet.create({ 
  text:{
    color: appColors.white,
    fontSize: 20,
    fontWeight: 'semibold'
  }
})