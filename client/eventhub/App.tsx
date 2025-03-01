import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SplasScreen } from './src/screens';
import AuthNavigator from './src/screens/navigators/AuthNavigator';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import MainNavigator from './src/screens/navigators/MainNavigator';

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [acessToken, setAcessToken] = useState('');
  const { getItem, setItem } = useAsyncStorage('assetToken');

  useEffect(() => {
    const timeOut = setTimeout(() => setIsShowSplash(false), 1000);
    return () => clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    checkLogin();
  },[]);

  const checkLogin = async() =>{
    const token = await getItem();
    token && setAcessToken(token);
  }

  return (
    <>
      <StatusBar style="dark" translucent />
      {isShowSplash ? (
        <SplasScreen />
      ) : (
        <NavigationContainer>
          {acessToken ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
