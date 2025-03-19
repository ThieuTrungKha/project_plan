import { View, Text, TextComponent, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { appInfo } from "../../constants/appInfo";
import { appColors } from "../../constants/appColor";
import Icon from "react-native-vector-icons/Ionicons";
import SectionCOmponent from "../../components/SectionComponent";
import RowComponent from "../../components/RowComponent";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { TextComponents } from "../../components";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import { autoBatchEnhancer } from "@reduxjs/toolkit";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";

const DetailPlanScreen = () => {
  const route = useRoute();
  const plan = route.params;
  console.log(plan);
  const [checked, setChecked] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#181810",
          height: appInfo.sizes.HEIGHT * 0.15,
          paddingHorizontal: 20,
          paddingTop: appInfo.sizes.HEIGHT * 0.08,
        }}
      >
        <RowComponent
          justify="space-between"
          stylles={{ alignItems: "center" }}
        >
          <RowComponent>
            <Icon
              name="arrow-back"
              size={24}
              color={appColors.white}
              style={{ alignItems: "center", justifyContent: "center" }}
            />

            <TextComponents
              text="Kế hoạch mẫu"
              size={20}
              color="white"
              styles={{ paddingLeft: 20, fontWeight: 500 }}
            />
          </RowComponent>
          <RowComponent>
            <Icon
              name="notifications"
              size={24}
              color={appColors.white}
              style={{ paddingRight: 20 }}
            />
            <Icon1 name="more-vert" size={28} color={appColors.white} />
          </RowComponent>
        </RowComponent>
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: appColors.white }}
        horizontal
      >
        <View
          style={{
            backgroundColor: "#f1f2f4",
            alignSelf: "flex-start",
            margin: 20,
            padding: 5,
            width: 300,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              margin: 10,
              width: 270,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "green",
                height: 50,
                borderRadius: 5,
              }}
            ></View>

            <RowComponent stylles={{ marginTop: 10 }}>
              <Pressable onPress={() => setChecked(!checked)}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 8,
                      borderWidth: 1,
                      backgroundColor: checked ? "green" : "white",
                    }}
                  >
                    {checked && (
                      <Text style={{ color: "white", fontSize: 20 }}>
                        <Icon1 name="check" size={20} color="white" />
                      </Text>
                    )}
                  </View>
                </View>
              </Pressable>
              <View style={{ flex: 1 }}>
                <Text>nhiệm vụ</Text>
              </View>
            </RowComponent>
            <RowComponent stylles={{ flexWrap: "wrap" }}>
              <RowComponent
                stylles={{
                  backgroundColor: "#FF4747",
                  paddingVertical: 3,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  marginTop: 10,
                }}
              >
                <Ionicons name="time-outline" size={24} color="white" />
                <TextComponents
                  text="13 th 12"
                  size={12}
                  color="white"
                  styles={{ marginLeft: 2 }}
                />
              </RowComponent>
              <RowComponent
                stylles={{
                  backgroundColor: "#00C566",
                  paddingVertical: 3,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  marginTop: 10,
                  marginLeft: 10,
                }}
              >
                <Ionicons name="checkmark-circle" size={24} color="white" />
                <TextComponents
                  text="1/2"
                  size={12}
                  color="white"
                  styles={{ marginLeft: 2 }}
                />
              </RowComponent>
              <RowComponent
                stylles={{
                  backgroundColor: "#FACC15",
                  paddingVertical: 6,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  marginTop: 10,
                  marginLeft: 10,
                }}
              >
                <Icon1 name="attach-file" size={18} color={appColors.white} />
                <TextComponents
                  text="1"
                  size={12}
                  color={appColors.white}
                  styles={{ marginLeft: 5 }}
                />
              </RowComponent>
            </RowComponent>
          </View>
        </View>
        <View
          style={{ height: 500, width: 500, backgroundColor: "navy" }}
        ></View>
      </ScrollView>
    </View>
  );
};

export default DetailPlanScreen;
