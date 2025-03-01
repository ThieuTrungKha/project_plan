import { View, Text, ImageBackground, ScrollView,TouchableOpacity } from 'react-native'
import React , {ReactNode}from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyles } from './../styles/globalStyle';
import { useNavigation } from '@react-navigation/native';
import RowComponent from './RowComponent';
import { ArrowLeft } from 'iconsax-react-native';
import { appColors } from '../constants/appColor';
import TextComponents from './TextComponents';


interface Props{
    isImageBackground?: boolean,
    isScroll?: boolean,
    title?: string,
    children: ReactNode,
    back?: boolean
}
const ContainerComponent = (props: Props) => {
    const { children, isScroll, isImageBackground, title, back } = props;
    const navigation: any = useNavigation();
    const headerComponent = () => {
        return(
            <View style ={{flex: 1, paddingTop: 35}}>
               {(title || back) && (
                 <RowComponent stylles={{
                    paddingHorizontal: 20, 
                    paddingVertical: 8,
                    minHeight: 48,
                    minWidth: 48
                    }}>
                 {back && (
                     <TouchableOpacity onPress={()=>navigation.goBack()  } style={{marginRight: 20}}>
                         <ArrowLeft size={24} color={appColors.textColor}/>
                     </TouchableOpacity>
                 )}
                    {title && (
                        <TextComponents text={title} styles={{fontWeight: 600}} size={24} />
                    )}
             </RowComponent>
               )

               }
                {returnContainer}
            </View>
        )
    }
   
    const returnContainer = isScroll ? (
        <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
    ) : (
        <View style={{ flex: 1 }}>{children}</View>
    );

    return isImageBackground ? (
        <ImageBackground
            source={require('../assets/img/background.png')}
            style={{ flex: 1 }}
            imageStyle={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>{headerComponent()}</SafeAreaView>
        </ImageBackground>
    ) : (
        <SafeAreaView style={globalStyles.container}>
            <View>{headerComponent()}</View>
        </SafeAreaView>
    );
};

export default ContainerComponent;
