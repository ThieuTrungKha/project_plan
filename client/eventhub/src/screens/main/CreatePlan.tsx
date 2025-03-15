import {
  View,
  Text,
  TextComponent,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { appColors } from "./../../constants/appColor";
import { appInfo } from "../../constants/appInfo";
import {
  ButtonComponent,
  InputComponent,
  SpaceComponent,
  TextComponents,
} from "../../components";
import RowComponent from "../../components/RowComponent";
import { CloseCircle } from "iconsax-react-native";
import { Ionicons } from "@expo/vector-icons";
import SectionCOmponent from "../../components/SectionComponent";
import { TextInput } from "react-native-gesture-handler";

const CreatePlan = () => {
  const [infoPlan, setInfoPlan] = useState("");
  const [infoComment, setInfoComment] = useState("");

  return (
    <View style={{ backgroundColor: appColors.white, flex: 1 }}>
      <View
        style={{
          backgroundColor: appColors.primary,
          height: appInfo.sizes.HEIGHT * 0.15,
        }}
      >
        <RowComponent stylles={{ alignItems: "center" }}>
          <TouchableOpacity>
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
              marginLeft: appInfo.sizes.HEIGHT * 0.05,
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
        <RowComponent
          stylles={{ justifyContent: "space-between", marginBottom: 50 }}
        >
          <TextComponents text="Phông nền kế hoạch" size={18} />
          <View
            style={{
              backgroundColor: appColors.primary,
              height: 40,
              width: 40,
            }}
          />
        </RowComponent>
        <ButtonComponent text="Tạo kế hoạch" type="primary" />
      </SectionCOmponent>
    </View>
  );
};

export default CreatePlan;
