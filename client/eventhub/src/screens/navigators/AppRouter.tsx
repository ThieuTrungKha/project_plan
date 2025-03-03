import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { addAuth } from '../../redux/reducers/authReducer';
import { authSelector } from '../../redux/reducers/authReducer';
import SplasScreen  from '../SplasScreen';



const AppRouters = () => {
  const [isShowSplash, setIsShowSplash] = useState(true)

  const {getItem} = useAsyncStorage('auth')

  const auth = useSelector(authSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    checkLogin();
    const timeout = setTimeout(() => {
      setIsShowSplash(false)
    }, 1500)

    return () => clearTimeout(timeout);
  }, []);

  const checkLogin = async () => {
    const res = await getItem();

    res && dispatch(addAuth(JSON.parse(res)))
  };
  console.log('Access Token:', auth.accessstoken);

  return (
    <>
    
      {isShowSplash ? (
        <SplasScreen />
      ) : auth.accessstoken ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default AppRouters;