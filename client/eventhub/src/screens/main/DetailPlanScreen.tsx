import {
  View,
  Text,
  TextComponent,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { appInfo } from "../../constants/appInfo";
import { appColors } from "../../constants/appColor";
import Icon from "react-native-vector-icons/Ionicons";
import RowComponent from "../../components/RowComponent";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import {
  ButtonComponent,
  InputComponent,
  TextComponents,
} from "../../components";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import { autoBatchEnhancer } from "@reduxjs/toolkit";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import ClientService from "../../apis/service";
import { useFocusEffect } from "@react-navigation/native";
import IconFont from "react-native-vector-icons/FontAwesome";
import { UserAdd } from "iconsax-react-native";
interface listPlan {
  _id: string;
  planListName: string;
  planListDescription: string;
  percentage: number;
  background: string;
  planId: string;
}
interface Task {
  _id: string;
  headerColor: string;
  taskInfo: string;
  taskDescription: string;
  deadline: string;
  subTask: [];
  statusTask: boolean;
  listPlanId: string;
}
interface subTask {
  _id: string;
  content: string;
  status: boolean;
}

const DetailPlanScreen = ({ navigation }: any) => {
  const route = useRoute();
  const paramPlan = route.params as {
    id: string;
    planName: string;
    photoUrlBackground: string;
    isAdminOrMember: string;
  };
  console.log("paramPlan", paramPlan);
  const [checked, setChecked] = useState(false);
  const [listName, setListName] = useState("");
  const [describe, setdescribe] = useState("");
  const [selectColor, setSelectColor] = useState(appColors.primary);
  const [isShowList, setIsShowList] = useState(false);
  const [newListValue, setNewListValue] = useState<any>(null);
  const [listPlan, setListPlan] = useState<listPlan[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subTask, setsubTask] = useState<subTask[]>([]);

  const valueColor = appInfo.listColor;
  const fetchDataListPlan = async (signal?: AbortSignal) => {
    try {
      const res = await ClientService.service(
        `/listplan/getListPlan?planId=${paramPlan.id}`,
        undefined,
        "get",
        signal,
      );
      setListPlan(res.data.listPlanData);
      setTasks(res.data.tasks);
    } catch (error) {}
  };
  const taskDataUpdated = async (taskId: string) => {
    const res = await ClientService.service(
      `/task/updateStatusTask?taskId=${taskId}`,
      undefined,
      "patch",
    );
    if (res) {
      fetchDataListPlan();
    }
  };
  useFocusEffect(
    useCallback(() => {
      const controller = new AbortController();
      const signal = controller.signal;
      fetchDataListPlan(signal);
      return () => {
        controller.abort();
        setListPlan([]);
      };
    }, [paramPlan?.id]),
  );

  const handleAddListPlan = async () => {
    try {
      const res = await ClientService.service(
        "/listplan/createListPlan",
        {
          planListName: listName,
          planListDescription: describe,
          background: selectColor,
          planId: paramPlan.id,
        },
        "post",
      );
      setNewListValue(res);
      setIsShowList(false);
      fetchDataListPlan();
    } catch (error) {
      console.log("error", error);
    }
  };
  const getTask = async (id: string) => {
    const res = await ClientService.service(
      `/task/getTask?taskId=${id}`,
      undefined,
      "get",
    );
    navigation.navigate("UpdateTask", {
      task: res.data,
      planId: paramPlan.id,
      isAdminOrMember: paramPlan.isAdminOrMember,
    });
  };
  const progress = (tasks: any) => {
    if (!tasks || tasks.length === 0) return 0;
    const totalTasks = tasks.length;
    let number = 0;

    tasks.forEach((task: any) => {
      if (task.statusTask === true) {
        number += 1;
      }
    });

    const percentage = (number / totalTasks) * 100;
    return percentage;
  };

  return (
    <View style={{ flex: 1 }}>
      {/* header plan */}
      <View
        style={{
          backgroundColor: paramPlan.photoUrlBackground,
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
              text={paramPlan.planName}
              size={20}
              color="white"
              styles={{ paddingLeft: 20, fontWeight: 500 }}
            />
          </RowComponent>
          <RowComponent>
            <TouchableOpacity onPress={progress}>
              {paramPlan.isAdminOrMember === "admin" && (
                <TouchableOpacity
                  style={{
                    width: appInfo.sizes.WIDTH * 0.2,
                    height: appInfo.sizes.HEIGHT * 0.04,
                    backgroundColor: appColors.white,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    navigation.navigate("GroupScreen", {
                      planId: paramPlan.id,
                      headerColor: paramPlan.photoUrlBackground,
                    });
                  }}
                >
                  <Ionicons
                    name="person-add"
                    size={14}
                    color={appColors.primary}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            {paramPlan.isAdminOrMember === "admin" && (
              <Icon1 name="more-vert" size={28} color={appColors.white} />
            )}
          </RowComponent>
        </RowComponent>
      </View>
      {/* danh sách các danh sách */}
      <ScrollView
        style={{ flex: 1, backgroundColor: appColors.white }}
        horizontal
      >
        {listPlan.map((list) => {
          if (!tasks) return null;
          const filteredTasks = tasks.filter(
            (task) => task.listPlanId === list._id,
          );
          const percentComplete = progress(filteredTasks);

          return (
            <ScrollView
              key={list._id}
              style={{
                backgroundColor: "#f1f2f4",
                alignSelf: "flex-start",
                margin: 20,
                padding: 5,
                width: appInfo.sizes.WIDTH * 0.83,
                borderRadius: 10,
              }}
            >
              <View style={{ padding: 10 }}>
                <RowComponent justify="space-between">
                  <TextComponents
                    text={list.planListName}
                    size={16}
                    styles={{
                      fontWeight: 500,
                      backgroundColor: list.background,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      color: appColors.white,
                    }}
                  />
                  {paramPlan.isAdminOrMember === "admin" && (
                    <Icon1
                      name="more-vert"
                      size={30}
                      color={appColors.textColor}
                    />
                  )}
                </RowComponent>
                <Text style={{ color: appColors.gray, marginTop: 10 }}>
                  {list.planListDescription}
                </Text>
                <TextComponents
                  text="Bạn đã hoàn thành:"
                  styles={{
                    fontSize: 13,
                    fontWeight: 500,
                    marginTop: 10,
                    marginBottom: 4,
                  }}
                />
                <RowComponent stylles={{ alignItems: "center" }}>
                  <View
                    style={{
                      borderColor: paramPlan.photoUrlBackground,
                      borderRadius: 10,
                      borderWidth: 1,
                      width: "80%",
                      height: appInfo.sizes.HEIGHT * 0.015,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: paramPlan.photoUrlBackground, // Màu nền của thanh
                        width: `${percentComplete}%`, // Chiều rộng theo phần trăm
                        height: "100%",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <TextComponents
                    text={`${percentComplete}%`}
                    size={16}
                    styles={{
                      paddingLeft: 10,
                      fontSize: 15,
                      fontWeight: 500,
                    }}
                  />
                </RowComponent>
                {paramPlan.isAdminOrMember === "admin" && (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("DetailTask", { id: list._id });
                    }}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: appColors.primary,
                      width: appInfo.sizes.WIDTH * 0.76,
                      height: appInfo.sizes.HEIGHT * 0.06,
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                  >
                    <TextComponents
                      text="Thêm nhiệm vụ"
                      size={14}
                      color={appColors.white}
                    />
                  </TouchableOpacity>
                )}
              </View>

              {/* nhiệm vụ */}
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => {
                  const completedSubTasks = task.subTask
                    ? task.subTask.filter(
                        (sub: any) => sub && sub.status === true,
                      ).length
                    : 0;
                  const totalSubTasks = task.subTask ? task.subTask.length : 0;

                  return (
                    <TouchableOpacity
                      onPress={() => getTask(task._id)}
                      key={task._id}
                      style={{
                        backgroundColor: "white",
                        margin: 10,
                        width: appInfo.sizes.WIDTH * 0.76,
                        borderRadius: 10,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: task.headerColor,
                          height: appInfo.sizes.HEIGHT * 0.03,
                          borderRadius: 5,
                        }}
                      />

                      <RowComponent
                        stylles={{ marginTop: 10, alignItems: "center" }}
                      >
                        {paramPlan.isAdminOrMember === "admin" && (
                          <Pressable onPress={() => taskDataUpdated(task._id)}>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <View
                                style={{
                                  width: 25,
                                  height: 25,
                                  borderRadius: 15,
                                  alignItems: "center",
                                  borderColor: appColors.boderColor,
                                  justifyContent: "center",
                                  marginRight: 8,
                                  borderWidth: task.subTask ? 1 : 1,
                                  backgroundColor: task.statusTask
                                    ? "#00C566"
                                    : "white",
                                }}
                              >
                                <Text
                                  style={{
                                    color: "white",
                                    fontSize: 20,
                                  }}
                                >
                                  <Icon1
                                    name="check"
                                    size={20}
                                    color={task.statusTask ? "white" : ""}
                                  />
                                </Text>
                              </View>
                            </View>
                          </Pressable>
                        )}
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontWeight: 500, fontSize: 18 }}>
                            {task.taskInfo}
                          </Text>
                        </View>
                      </RowComponent>
                      <RowComponent
                        stylles={{ flexWrap: "wrap", paddingBottom: 10 }}
                      >
                        {task.deadline !== null && (
                          <RowComponent
                            stylles={{
                              backgroundColor: "#FF4747",
                              paddingVertical: 3,
                              paddingHorizontal: 5,
                              borderRadius: 5,
                              marginTop: 10,
                              alignItems: "center",
                            }}
                          >
                            <Ionicons
                              name="time-outline"
                              size={24}
                              color="white"
                            />
                            <TextComponents
                              text={new Date(task.deadline).toLocaleString()}
                              size={12}
                              color="white"
                              styles={{ marginLeft: 2 }}
                            />
                          </RowComponent>
                        )}
                        {totalSubTasks !== 0 && (
                          <RowComponent
                            stylles={{
                              backgroundColor:
                                completedSubTasks < totalSubTasks
                                  ? "#FACC15"
                                  : "#00C566",
                              paddingVertical: 3,
                              paddingHorizontal: 5,
                              borderRadius: 5,
                              marginTop: 10,
                              marginLeft: 10,
                              alignItems: "center",
                            }}
                          >
                            <Ionicons
                              name="checkmark-circle"
                              size={24}
                              color="white"
                            />

                            <TextComponents
                              key={task._id}
                              text={`${completedSubTasks}/${totalSubTasks}`}
                              size={12}
                              color="white"
                              styles={{ marginLeft: 2 }}
                            />
                          </RowComponent>
                        )}
                      </RowComponent>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text style={{ color: appColors.gray, marginTop: 10 }}>
                  Chưa có nhiệm vụ nào
                </Text>
              )}
            </ScrollView>
          );
        })}
        {/* Nút thêm danh sách */}
        {paramPlan.isAdminOrMember === "admin" && (
          <TouchableOpacity
            onPress={() => {
              setIsShowList(true);
            }}
            style={{
              backgroundColor: appColors.primary,
              width: appInfo.sizes.WIDTH * 0.6,
              height: appInfo.sizes.HEIGHT * 0.08,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              margin: 20,
            }}
          >
            <Text style={{ color: appColors.white, fontWeight: 500 }}>
              Thêm danh sách
            </Text>
          </TouchableOpacity>
        )}
        {/* from nhập thông tin danh sách */}
        {isShowList && (
          <View
            style={{
              borderRadius: 10,
              margin: 20,
              marginLeft: 0,
              padding: 6,
              width: appInfo.sizes.WIDTH * 0.9,
              borderColor: paramPlan.photoUrlBackground,
              borderWidth: 1,
              alignSelf: "flex-start",
            }}
          >
            <InputComponent
              value={listName}
              onChange={(val) => setListName(val)}
              allowClear
              placeholder="Nhập tên danh sách..."
            />
            <TextInput
              value={describe}
              onChangeText={(val) => setdescribe(val)}
              placeholder="Nhập mô tả cho danh sách..."
              style={{ paddingLeft: 10, fontSize: 15 }}
              multiline={true}
            />
            <TextComponents
              text="Bạn đã hoàn thành:"
              size={16}
              styles={{
                paddingLeft: 10,
                fontSize: 15,
                fontWeight: 500,
                marginTop: 20,
                marginBottom: 8,
              }}
            />
            <RowComponent stylles={{ alignItems: "center" }}>
              <View
                style={{
                  borderColor: paramPlan.photoUrlBackground,
                  borderRadius: 10,
                  borderWidth: 1,
                  width: "80%",
                  height: appInfo.sizes.HEIGHT * 0.015,
                  marginLeft: 10,
                }}
              />
              <TextComponents
                text="0%"
                size={16}
                styles={{
                  paddingLeft: 10,
                  fontSize: 15,
                  fontWeight: 500,
                }}
              />
            </RowComponent>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 10,
              }}
            >
              {valueColor.map((color) => {
                const isSelected = selectColor === color;

                return (
                  <TouchableOpacity
                    key={color}
                    style={{
                      backgroundColor: color,
                      width: 20,
                      height: 20,
                      borderRadius: 15,
                      marginLeft: 10,
                      borderColor: isSelected ? appColors.boderColor : "",
                      borderWidth: isSelected ? 3 : 0,
                    }}
                    onPress={() => setSelectColor(color)}
                  />
                );
              })}
            </View>
            <RowComponent stylles={{ marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  setIsShowList(false);
                  setListName("");
                  setdescribe("");
                }}
                style={{
                  width: appInfo.sizes.WIDTH * 0.3,
                  height: appInfo.sizes.HEIGHT * 0.06,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "red",
                  margin: 10,
                }}
              >
                <Text style={{ color: "red", fontWeight: 600 }}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddListPlan}
                style={{
                  backgroundColor: appColors.primary,
                  width: appInfo.sizes.WIDTH * 0.4,
                  height: appInfo.sizes.HEIGHT * 0.06,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  margin: 10,
                }}
              >
                <Text style={{ color: appColors.white, fontWeight: 600 }}>
                  Lưu
                </Text>
              </TouchableOpacity>
            </RowComponent>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DetailPlanScreen;
