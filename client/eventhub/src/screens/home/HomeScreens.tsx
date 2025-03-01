import { View, Text, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreens = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>HomeScreens</Text>
      <Button title='logout' onPress={async()=>{ await AsyncStorage.clear()}}/>
    </View>
  )
}

export default HomeScreens