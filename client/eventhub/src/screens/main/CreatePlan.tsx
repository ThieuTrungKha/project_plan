import {
  View,
  Text,
  TextComponent,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { appColors } from "./../../constants/appColor";
import { appInfo } from "../../constants/appInfo";
import {
  ButtonComponent,
  InputComponent,
  SpaceComponent,
  TextComponents,
} from "../../components";
import RowComponent from "../../components/RowComponent";
import { CloseCircle, Key } from "iconsax-react-native";
import { Ionicons } from "@expo/vector-icons";
import SectionCOmponent from "../../components/SectionComponent";
import { TextInput } from "react-native-gesture-handler";
import PlanApiService from "../../apis/planApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CreatePlan = ({ navigation }: any) => {
  const [infoPlan, setInfoPlan] = useState("");
  const [infoComment, setInfoComment] = useState("");
  const [selectColor, setSelectColor] = useState(appColors.primary);
  const [isDisabled, setiIsDisabled] = useState(true);

  useEffect(() => {
    if (infoPlan) {
      setiIsDisabled(false);
    } else {
      setiIsDisabled(true);
    }
  }, [infoPlan]);

  const valueColor = [
    appColors.primary,
    "#8BC34A", // Green
    "#E91E63", // Pink
    "#FFC107", // Amber
    "#673AB7", // Deep Purple
    "#009688", // Teal
  ];
  const handlePlan = async () => {
    try {
      const res = await PlanApiService.planService(
        "/createPlan",
        {
          planName: infoPlan,
          planDescription: infoComment,
          photoUrlBackground: selectColor,
        },
        "post",
      );
      navigation.navigate("HomeScreens");
      setInfoPlan("");
      setInfoComment("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ backgroundColor: appColors.white, flex: 1 }}>
      <View
        style={{
          backgroundColor: selectColor,
          height: appInfo.sizes.HEIGHT * 0.15,
        }}
      >
        <RowComponent stylles={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="close"
              size={32}
              color={appColors.white}
              style={{ marginLeft: 10, marginTop: appInfo.sizes.HEIGHT * 0.09 }}
            />
          </TouchableOpacity>
          <TextComponents
            text="Tạo kế hoạch của bạn"
            color={appColors.white}
            size={24}
            styles={{
              marginTop: appInfo.sizes.HEIGHT * 0.09,
              marginLeft: appInfo.sizes.HEIGHT * 0.04,
            }}
          />
        </RowComponent>
      </View>
      <SpaceComponent height={20} />
      <SectionCOmponent>
        <InputComponent
          value={infoPlan}
          onChange={(val) => setInfoPlan(val)}
          allowClear
          placeholder="Nhập mục tiêu kế hoạch..."
        />
        <TextInput
          value={infoComment}
          onChangeText={(val) => setInfoComment(val)}
          placeholder="Nhập mô tả cho kế hoạch..."
          style={{
            borderWidth: 1,
            borderColor: appColors.boderColor,
            padding: 14,
            height: appInfo.sizes.HEIGHT * 0.2,
            textAlignVertical: "top",
            borderRadius: 12,
            fontSize: 16,
          }}
        />

        <View
          style={{
            width: "100%",
            backgroundColor: appColors.boderColor,
            height: 1,
            marginTop: 20,
            marginBottom: 20,
          }}
        />

        <TextComponents text="Phông nền kế hoạch" size={18} />
        <View style={{ flexDirection: "row", marginVertical: 30 }}>
          {valueColor.map((color) => {
            return (
              <TouchableOpacity
                key={color}
                style={{
                  backgroundColor: color,
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  marginRight: 10,
                  marginBottom: 10,
                }}
                onPress={() => setSelectColor(color)}
              />
            );
          })}
        </View>
        <ButtonComponent
          disabled={isDisabled}
          text="Tạo kế hoạch"
          type="primary"
          onPress={() => handlePlan()}
        />
      </SectionCOmponent>
    </View>
  );
};

export default CreatePlan;
