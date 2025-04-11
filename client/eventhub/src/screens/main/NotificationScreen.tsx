import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { appColors } from "./../../constants/appColor";
import { appInfo } from "../../constants/appInfo";
import RowComponent from "../../components/RowComponent";
import { TextComponents } from "../../components";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import ClientService from "../../apis/service";

const NotificationScreen = ({ navigation }: any) => {
  const [dataInvitation, setDataInvitation] = useState<any>([]);
  const listDataInvitation = async () => {
    try {
      const res = await ClientService.service(
        "/permission/getInvitation",
        undefined,
        "get",
      );
      console.log("res list data invitation", res);
      setDataInvitation(res.data);
    } catch (error) {
      console.log("error get list data invitation", error);
    }
  };
  const handleAcceptInvitation = async (planId: any) => {
    try {
      const res = await ClientService.service(
        `/permission/acceptInvitation?planId=${planId}`,
        undefined,
        "patch",
      );
      console.log("res accept invitation", res);
    } catch (error) {
      console.log("error accept invitation", error);
    }
  };
  useEffect(() => {
    listDataInvitation();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: appColors.primary,
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
              text={"Thông báo"}
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
      {/* body */}
      <View style={{ backgroundColor: appColors.white, flex: 1 }}>
        {dataInvitation &&
          dataInvitation.map((item: any) => {
            return (
              <RowComponent
                key={item.planId}
                stylles={{
                  padding: 10,
                  borderBottomColor: appColors.gray1,
                  borderBottomWidth: 1,
                }}
              >
                <Text style={{ flex: 1, fontSize: 16 }}>
                  <Text style={{ fontWeight: "bold" }}>{item.username}</Text> đã
                  mời bạn tham gia kế hoạch{" "}
                  <Text style={{ fontWeight: "bold" }}>{item.planName}</Text>
                </Text>
                <View style={{ marginLeft: 2 }}>
                  <TouchableOpacity
                    onPress={() => handleAcceptInvitation(item.planId)}
                    style={{
                      padding: 10,
                      backgroundColor: appColors.primary,
                      borderRadius: 5,
                    }}
                  >
                    <TextComponents text="Tham gia" color={appColors.white} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginTop: 5,
                      padding: 7,
                      borderRadius: 5,
                      alignItems: "center",
                      justifyContent: "center",
                      borderColor: "red",
                      borderWidth: 1,
                    }}
                  >
                    <TextComponents text="Hủy" color="red" />
                  </TouchableOpacity>
                </View>
              </RowComponent>
            );
          })}
      </View>
    </View>
  );
};

export default NotificationScreen;
