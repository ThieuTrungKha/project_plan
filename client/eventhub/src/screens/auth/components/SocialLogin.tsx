import { View, Text, SectionListComponent } from 'react-native'
import React from 'react'
import SectionComponent from './../../../components/SectionComponent';
import TextComponents from './../../../components/TextComponents';
import { appColors } from '../../../constants/appColor';
import { ButtonComponent, SpaceComponent } from '../../../components';
import { FacebookSvg, GoogleSvg } from '../../../assets/svgs';
import { Facebook } from 'iconsax-react-native';
const SocialLogin = () => {
  const handleLoginWithGoogle = () => {}
  return (
   <SectionComponent>
    <TextComponents 
    text="OR" 
    color={appColors.gray}
    styles={{textAlign: 'center'}}
    />
    <SpaceComponent height={16}/>
    <ButtonComponent
    onPress={handleLoginWithGoogle}
    text='Login in with Google'
    type='primary'
    color={appColors.white}
    textColor={appColors.textColor}
    icon={<GoogleSvg/>}
    iconFlex='left'
    />
    <ButtonComponent
    text='Login in with Facebook'
    type='primary'
    color={appColors.white}
    textColor={appColors.textColor}
    icon={<FacebookSvg/>}
    iconFlex='left'
    />
   </SectionComponent>
  )
}

export default SocialLogin