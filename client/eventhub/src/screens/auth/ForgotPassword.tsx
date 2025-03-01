import { View, Text, TextComponent } from 'react-native'
import React, { useState } from 'react'
import ContainerComponent from '../../components/ContainerComponent'
import SectionCOmponent from '../../components/SectionComponent'
import TextComponents from './../../components/TextComponents';
import { InputComponent, SpaceComponent } from '../../components';
import { Arrow, ArrowRight, Sms } from 'iconsax-react-native';
import { appColors } from '../../constants/appColor';
import ButtonComponent from './../../components/ButtonComponent';

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
  return (
    <ContainerComponent back isImageBackground >
        <SectionCOmponent>
            <TextComponents text='Resset Password' title styles={{fontWeight: 400}}/>
            <TextComponents text='Please enter your email address to request a password reset' />
            <SpaceComponent height={26}/>
            <InputComponent 
            value = {email}  
            onChange={val => setEmail(val)}
            affix={<Sms size={20} color={appColors.gray}/>}
            placeholder='abc@gmail.com'
            />
        </SectionCOmponent>
        <SectionCOmponent>
            <ButtonComponent 
            text='SEND'
            type='primary'
            icon={<ArrowRight size={28} color={appColors.white}/>}
            textStyle={{}}
            />
        </SectionCOmponent>
    </ContainerComponent>
  )
}

export default ForgotPassword