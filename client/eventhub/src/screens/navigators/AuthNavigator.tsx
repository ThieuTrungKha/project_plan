import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreens from './../auth/LoginScreens';
import OnbroadingScreen from '../auth/OnbroadingScreen';
import SignUpScreens from './../auth/SignUpScreen';
import Verication from './../auth/Verication';
import ForgotPassword from './../auth/ForgotPassword';

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='OnbroadingScreen' component={OnbroadingScreen}/>
        <Stack.Screen name='LoginScreens' component={LoginScreens}/>
        <Stack.Screen name='SignUpScreens' component={SignUpScreens}/>
        <Stack.Screen name='Verication' component={Verication}/>
        <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>

    </Stack.Navigator>);
}

export default AuthNavigator