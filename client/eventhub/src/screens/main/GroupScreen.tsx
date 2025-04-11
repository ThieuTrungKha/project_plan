import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import RowComponent from "../../components/RowComponent";
import { appInfo } from "../../constants/appInfo";
import { useRoute } from "@react-navigation/native";
import { appColors } from "../../constants/appColor";
import { TextComponents } from "../../components";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import ClientService from "../../apis/service";

interface Prop {
  username: string;
  email: string;
}

const InfoMember = (props: Prop) => {
  const { username, email } = props;
  return (
    <RowComponent align="center" stylles={{ paddingRight: 10, marginTop: 20 }}>
      <View
        style={{
          backgroundColor: appColors.gray,
          width: 40,
          height: 40,
          borderRadius: 50,
        }}
      />

      <View style={{ paddingLeft: 10, flex: 1 }}>
        <TextComponents
          text={username}
          size={16}
          color={appColors.gray}
          styles={{ fontWeight: 500 }}
        />
        <TextComponents text={email} size={16} color={appColors.gray} />
      </View>
      <TextComponents text="admin" size={16} color={appColors.gray} />
    </RowComponent>
  );
};

const GroupScreen = ({ navigation }: any) => {
  const route = useRoute();
  const [adminValue, setAdminValue] = useState<Prop>();

  const paramPlan = route.params as { planId: string; headerColor: string };
  const getInfoAdmin = async () => {
    try {
      const res = await ClientService.service(
        `/permission/getDataAdmin?planId=${paramPlan.planId}`,
      );
      setAdminValue(res.data);
    } catch (error) {
      console.log("error get info admin", error);
    }
  };

  useEffect(() => {
    getInfoAdmin();
  }, []);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: appColors.gray1 }}>
      {/* header màn hình */}
      <View
        style={{
          backgroundColor: paramPlan.headerColor,
          height: appInfo.sizes.HEIGHT * 0.15,
          paddingHorizontal: 20,
          paddingTop: appInfo.sizes.HEIGHT * 0.09,
        }}
      >
        <RowComponent
          justify="space-between"
          stylles={{ alignItems: "center" }}
        >
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                size={24}
                color={appColors.white}
                style={{ alignItems: "center", justifyContent: "center" }}
              />
            </TouchableOpacity>

            <TextComponents
              text={"Group Screen"}
              size={20}
              color="white"
              styles={{ paddingLeft: 20, fontWeight: 500 }}
            />
          </RowComponent>
          <RowComponent>
            <Icon1 name="more-vert" size={28} color={appColors.white} />
          </RowComponent>
        </RowComponent>
      </View>
      <View style={{ padding: 20 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddMemberScreen", {
              planId: paramPlan.planId,
              headerColor: paramPlan.headerColor,
            })
          }
          style={{
            backgroundColor: appColors.primary,
            width: "100%",
            height: appInfo.sizes.HEIGHT * 0.06,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: appColors.white, fontWeight: 600 }}>
            Thêm thành viên
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: appColors.white, padding: 10 }}>
        <RowComponent>
          <Icon name="people" size={24} color={appColors.gray} />

          <TextComponents
            text="Thành viên của kế hoạch"
            size={16}
            color={appColors.gray}
          />
        </RowComponent>
        <InfoMember
          username={adminValue?.username || ""}
          email={adminValue?.email || ""}
        />
      </View>
    </ScrollView>
  );
};

export default GroupScreen;
