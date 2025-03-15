import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  Image,
  Button,
} from "react-native";
import React, { useState } from "react";
import { appInfo } from "../../constants/appInfo";
import RowComponent from "../../components/RowComponent";
import Icon from "react-native-vector-icons/Ionicons";
import { appColors } from "../../constants/appColor";
import {
  ButtonComponent,
  InputComponent,
  TextComponents,
} from "../../components";
import IconMertial from "react-native-vector-icons/MaterialIcons";
import { MaterialIcons } from "@expo/vector-icons";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import SectionCOmponent from "../../components/SectionComponent";

const DetailTask = () => {
  const [checked, setChecked] = useState(false);
  const [describle, setDescrible] = useState("");
  const [isList, setIsList] = useState(true);
  const [isListTask, setIsListTask] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: appInfo.sizes.HEIGHT * 0.08,
          }}
        >
          <View
            style={{
              width: "100%",
              height: appInfo.sizes.HEIGHT * 0.3,
              backgroundColor: "#181810",
            }}
          >
            <RowComponent justify="space-between" stylles={{ margin: 20 }}>
              <Icon
                name="arrow-back"
                size={24}
                color={appColors.white}
                style={{ alignItems: "center", justifyContent: "center" }}
              />

              <IconMertial name="more-vert" size={24} color={appColors.white} />
            </RowComponent>
            <TouchableOpacity
              style={{
                marginTop: appInfo.sizes.HEIGHT * 0.1,
                marginLeft: appInfo.sizes.WIDTH * 0.06,
                backgroundColor: appColors.iconColor,
                borderRadius: 10,
                justifyContent: "center",
                padding: 5,
                alignSelf: "flex-start",
              }}
            >
              <RowComponent stylles={{ padding: 4 }}>
                <MaterialIcons name="photo" size={24} color="black" />
                <Text>Thêm ảnh bìa</Text>
              </RowComponent>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: "#f1f2f4" }}>
          <View
            style={{
              backgroundColor: "white",
              paddingBottom: 17,
              paddingHorizontal: 15,
            }}
          >
            <RowComponent stylles={{ marginTop: 10 }} justify="center">
              <Pressable onPress={() => setChecked(!checked)}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 24,
                      height: 24,
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
                        <Icon1 name="check" size={16} color="white" />
                      </Text>
                    )}
                  </View>
                </View>
              </Pressable>
              <View style={{ flex: 1 }}>
                <TextComponents
                  text="Task lạp trình js"
                  size={20}
                  color={appColors.textColor}
                />
              </View>
            </RowComponent>
            <RowComponent stylles={{ marginTop: 22 }}>
              <View
                style={{
                  backgroundColor: "navy",
                  width: appInfo.sizes.WIDTH * 0.14,
                  height: appInfo.sizes.HEIGHT * 0.05,
                }}
              ></View>
              <View style={{ marginLeft: 10 }}>
                <TextComponents text="kế hoạch mẫu" size={14} />
                <TextComponents text="danh sách kê hoạch" size={14} />
              </View>
            </RowComponent>
          </View>
          <View
            style={{
              backgroundColor: "white",
              paddingBottom: 17,
              paddingHorizontal: 15,
              marginTop: 20,
            }}
          >
            <RowComponent>
              <MaterialIcons name="menu" size={24} color="black" />
              <TextInput
                value={describle}
                onChangeText={(val) => {
                  setDescrible(val);
                }}
                placeholder="Thêm mô tả"
                style={{ marginLeft: 10, fontSize: 16 }}
                multiline={true}
              />
            </RowComponent>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: appColors.iconColor,
                width: "100%",
              }}
            />
          </View>
          <RowComponent
            stylles={{
              paddingBottom: 17,
              paddingHorizontal: 15,
              marginTop: 20,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Icon1 name="attach-file" size={24} color="black" />
            <TextComponents text="Tập tin đính kèm" size={16} />
            <Icon1 name="add" size={24} color="black" />
          </RowComponent>
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 15,
              paddingVertical: 17,
            }}
          >
            <TouchableOpacity onPress={() => setIsList(!isList)}>
              <RowComponent justify="space-between">
                <Icon name="document" size={24} color={appColors.iconColor} />
                <TextComponents text="Tệp của bạn" size={16} />
                {isList ? (
                  <Icon
                    name="chevron-down"
                    size={24}
                    color={appColors.iconColor}
                  />
                ) : (
                  <Icon
                    name="chevron-up"
                    size={24}
                    color={appColors.iconColor}
                  />
                )}
              </RowComponent>
            </TouchableOpacity>
            {isList && (
              <>
                <RowComponent
                  justify="space-between"
                  stylles={{ paddingTop: 26 }}
                >
                  <View>
                    <TextComponents text="Tệp 134 của tôi" size={16} />
                    <TextComponents
                      text="5,7 mb"
                      color={appColors.gray}
                      size={16}
                    />
                  </View>
                  <Icon1
                    name="more-vert"
                    size={24}
                    color={appColors.iconColor}
                  />
                </RowComponent>
                <RowComponent
                  justify="space-between"
                  stylles={{ paddingTop: 26 }}
                >
                  <View>
                    <TextComponents text="Tệp 134 của tôi" size={16} />
                    <TextComponents
                      text="5,7 mb"
                      color={appColors.gray}
                      size={16}
                    />
                  </View>
                  <Icon1
                    name="more-vert"
                    size={24}
                    color={appColors.iconColor}
                  />
                </RowComponent>
              </>
            )}
          </View>

          <RowComponent
            stylles={{
              paddingBottom: 17,
              paddingHorizontal: 15,
              marginTop: 20,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Icon1 name="check-box" size={24} color={appColors.iconColor} />
            <TextComponents text="Nhiệm vụ phụ" size={16} />
            <Icon1 name="add" size={24} color="black" />
          </RowComponent>
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 15,
              paddingVertical: 17,
            }}
          >
            <TouchableOpacity onPress={() => setIsListTask(!isListTask)}>
              <RowComponent justify="space-between">
                <Icon1 name="checklist" size={24} color={appColors.iconColor} />
                <TextComponents text="Danh sách nhiệm vụ phụ" size={16} />
                {isListTask ? (
                  <Icon
                    name="chevron-down"
                    size={24}
                    color={appColors.iconColor}
                  />
                ) : (
                  <Icon
                    name="chevron-up"
                    size={24}
                    color={appColors.iconColor}
                  />
                )}
              </RowComponent>
            </TouchableOpacity>
            {isListTask && (
              <>
                <RowComponent
                  justify="space-between"
                  stylles={{ paddingTop: 26 }}
                >
                  <Icon1 name="check" size={24} color={appColors.iconColor} />
                  <TextComponents text="Tệp 134 của tôi" size={16} />
                  <Icon1
                    name="more-vert"
                    size={24}
                    color={appColors.iconColor}
                  />
                </RowComponent>
              </>
            )}
          </View>

          <View style={{ flex: 1, paddingHorizontal: 15 }}>
            <RowComponent justify="space-between" stylles={{ marginTop: 20 }}>
              <TextComponents
                text="Ghi chú"
                size={16}
                styles={{ fontWeight: 600 }}
              />
              <Icon1 name="more-vert" size={24} color={appColors.textColor} />
            </RowComponent>
            <RowComponent
              justify="space-between"
              stylles={{
                marginTop: 20,
                alignItems: "flex-start",
                marginBottom: 10,
              }}
            >
              <RowComponent
                stylles={{
                  flex: 1,
                  alignItems: "flex-start",
                }}
              >
                <Image
                  source={require("../../assets/img/image.png")}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                  }}
                />
                <View style={{ flex: 1, marginLeft: 5 }}>
                  <TextComponents text="kha" size={16} />
                  <Text
                    style={{
                      backgroundColor: appColors.white,
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
                  </Text>
                </View>
              </RowComponent>
              <Icon1 name="more-vert" size={24} color={appColors.textColor} />
            </RowComponent>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                backgroundColor: appColors.primary,
                borderRadius: 10,
                marginBottom: 100,
                marginTop: 40,
                width: "100%",
                height: appInfo.sizes.HEIGHT * 0.05,
              }}
            >
              <TextComponents
                text="Lưu"
                color={appColors.white}
                styles={{ fontWeight: 500 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: appColors.white,
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <RowComponent align="center" stylles={{ padding: 10 }}>
          <Image
            source={require("../../assets/img/image.png")}
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
            }}
          />
          <TextInput
            placeholder="Thêm bình luận"
            style={{
              flex: 1,
              backgroundColor: appColors.white,
              padding: 10,
              fontSize: 16,
            }}
          />
        </RowComponent>
      </View>
    </View>
  );
};

export default DetailTask;
