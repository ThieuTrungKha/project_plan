import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreens from './../home/HomeScreens';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false}}>
      <Tab.Screen name='HomeScreens' component={HomeScreens}/>
    </Tab.Navigator>
  
  )
}

export default TabNavigator