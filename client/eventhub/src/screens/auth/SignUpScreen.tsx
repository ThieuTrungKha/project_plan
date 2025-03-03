import { View, Text, Button,Image, TextComponent,Switch } from 'react-native'
import React,{useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ButtonComponent from '../../components/ButtonComponent';
import { globalStyles } from '../../styles/globalStyle';
import InputComponent from '../../components/InputComponent';
import { Sms,Lock, User } from 'iconsax-react-native';
import { appColors } from '../../constants/appColor';
import ContainerComponent from '../../components/ContainerComponent';
import SectionComponent from '../../components/SectionComponent';
import TextComponents from '../../components/TextComponents';
import { SpaceComponent } from '../../components';
import { useHandler } from 'react-native-reanimated';
import RowComponent from '../../components/RowComponent';
import SectionCOmponent from '../../components/SectionComponent';
import SocialLogin from './components/SocialLogin';
import LoginScreens from './LoginScreens';
import LoadingModal from '../../modals/LoadingModal';
import authenticationApi from '../../apis/authApi';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer';

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}
const SignUpScreens = ({navigation}:any) => {
  const [values, setValues] = useState(initValue)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch()
const handleChangeValue = (key:string, value:string) =>{
  const data: any = {...values}
  data[`${key}`] = value
  setValues(data)
}
const handleSignUp = async () => {
  const { email, password, confirmPassword} = values
 if (email && password && confirmPassword) {
  try {
    const res = await authenticationApi.HandleAuthentication('/register', 
      {
        username: values.username,
        email: values.email,
        password: values.password
      }, 
      'post')
    dispatch(addAuth(res.data))
    await AsyncStorage.setItem('auth', JSON.stringify(res.data))
  } catch (error) {
    console.log(error)
    setIsLoading(false)
  }
  
 }else{
    setErrorMessage('Please fill in all fields')
 }
}
  return (
    <ContainerComponent isImageBackground isScroll back  >
       <SectionComponent>
        <TextComponents text='Sign up' size={24} styles={{fontWeight: 500}}/>
        <SpaceComponent height={21}/>
        <InputComponent 
      value={values.username} 
      placeholder='full name'
      onChange={val => handleChangeValue('username', val)} 
      allowClear
      affix={<User size={22} color={appColors.gray} />}
      />
      <InputComponent 
      value={values.email} 
      placeholder='Email'
      onChange={val => handleChangeValue('email',val)} 
      allowClear
      affix={<Sms size={22} color={appColors.gray} />}
      />
      <InputComponent 
      value={values.password} 
      placeholder='Password'
      onChange={val => handleChangeValue('password',val)} 
      isPassword
      allowClear
      affix={<Lock size={22} color={appColors.gray} />}
      />
      <InputComponent 
      value={values.confirmPassword} 
      placeholder='Confirm Password'
      onChange={val => handleChangeValue('confirmPassword',val)} 
      isPassword
      allowClear
      affix={<Lock size={22} color={appColors.gray} />}
      />
       </SectionComponent>
       {
          errorMessage ? <TextComponents text={errorMessage} color={'red'} size={12} styles={{textAlign: 'center'}}/> : null
       }
       <SpaceComponent height={16}/>
       <SectionCOmponent>
          <ButtonComponent text='SIGN UP' type='primary' onPress={handleSignUp}/>
       </SectionCOmponent>
       <SocialLogin/>
       <SectionCOmponent>
        <RowComponent justify='center'>
        <TextComponents text='Don’t have an account?' />
        <ButtonComponent text=' Sign in' type='link' onPress={()=>{navigation.navigate('LoginScreens')}} />
        </RowComponent>
       </SectionCOmponent>
       <LoadingModal visible={isLoading}  />
    </ContainerComponent>
  )
}

export default SignUpScreens