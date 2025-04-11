import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { appColors } from "../../constants/appColor";
import RowComponent from "../../components/RowComponent";
import {
  InputComponent,
  SpaceComponent,
  TextComponents,
} from "../../components";
import { appInfo } from "../../constants/appInfo";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import SectionCOmponent from "../../components/SectionComponent";
import { FlatList, TextInput } from "react-native-gesture-handler";
import ClientService from "../../apis/service";

const AddMemberScreen = ({ navigation }: any) => {
  const route = useRoute();
  const paramPlan = route.params as { planId: string; headerColor: string };

  const [emaiUser, setEmaiUser] = useState("");
  const [suggestions, setSuggestions] = useState<{ email: string }[]>([]);
  const [inviteValue, setInviteValue] = useState([]);

  const suggestEmail = async () => {
    if (emaiUser.length === 0) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await ClientService.service(
        `/permission/suggest?email=${emaiUser}`,
        undefined,
        "get",
      );
      setSuggestions(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInvite = async () => {
    console.log("invite", emaiUser);
    try {
      const res = await ClientService.service(
        "/permission/invitation",
        {
          planId: paramPlan.planId,
          emailMember: emaiUser,
        },
        "post",
      );
      console.log(res.data);
    } catch (error) {
      console.log("error invite", error);
    }
  };
  const getAllInvitedMembersInPlan = async () => {
    const res = await ClientService.service(
      `/permission/getInvited?planId=${paramPlan.planId}`,
      undefined,
      "get",
    );
    setInviteValue(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getAllInvitedMembersInPlan();
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(suggestEmail, 300); // tránh gửi request quá nhanh
    return () => clearTimeout(debounceTimeout);
  }, [emaiUser]);

  return (
    <View style={{ flex: 1, backgroundColor: appColors.gray1 }}>
      {/* header */}
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
              text={"Mời tham gia nhóm"}
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
      <SpaceComponent height={20} />
      <View style={{ padding: 3 }}>
        <RowComponent justify="space-between" stylles={{ padding: 5 }}>
          <TextInput
            value={emaiUser}
            onChangeText={(text) => setEmaiUser(text)}
            placeholder="Nhập email thành viên"
            style={{
              backgroundColor: appColors.white,
              width: appInfo.sizes.WIDTH * 0.74,
              height: appInfo.sizes.HEIGHT * 0.06,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              handleInvite();
            }}
            style={{
              padding: 5,
              borderRadius: 5,
              width: appInfo.sizes.WIDTH * 0.2,
              height: appInfo.sizes.HEIGHT * 0.06,
              backgroundColor: appColors.primary,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 5,
            }}
          >
            <TextComponents text="mời" size={16} color={appColors.white} />
          </TouchableOpacity>
        </RowComponent>

        {/* SUGGESTIONS hiển thị ở đây */}
        {suggestions.length > 0 && (
          <View
            style={{
              backgroundColor: appColors.white,
              marginTop: 5,
              borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
              maxHeight: 150,
            }}
          >
            {suggestions.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setEmaiUser(item.email);
                  setSuggestions([]);
                }}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderBottomWidth: index !== suggestions.length - 1 ? 1 : 0,
                  borderBottomColor: appColors.gray1,
                }}
              >
                <TextComponents
                  text={item.email}
                  size={16}
                  color={appColors.textColor}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <SpaceComponent height={10} />
      {/* danh sách thành viên đã mời */}
      <View style={{ backgroundColor: appColors.white, padding: 10 }}>
        <RowComponent>
          <Icon name="people" size={24} color={appColors.gray} />

          <TextComponents
            text="Danh sách thành viên đã mời"
            size={16}
            color={appColors.textColor}
            styles={{ marginLeft: 10 }}
          />
        </RowComponent>
        {inviteValue &&
          inviteValue.map((item: any, index: number) => {
            return (
              <RowComponent
                key={index}
                align="center"
                stylles={{ paddingRight: 10, marginTop: 20 }}
              >
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
                    text={item.username}
                    size={16}
                    color={appColors.gray}
                    styles={{ fontWeight: 500 }}
                  />
                  <TextComponents
                    text={item.emailMember}
                    size={16}
                    color={appColors.gray}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    padding: 5,
                    borderRadius: 5,
                    width: appInfo.sizes.WIDTH * 0.2,
                    height: appInfo.sizes.HEIGHT * 0.05,
                    borderColor: "red",
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextComponents text="hủy" size={16} color="red" />
                </TouchableOpacity>
              </RowComponent>
            );
          })}
      </View>
    </View>
  );
};

export default AddMemberScreen;
