import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  Image,
  Button,
  ImageBackground,
  Alert,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as Sharing from "expo-sharing";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
import axiosClient from "../../apis/axiosClient";
import ClientService from "../../apis/service";
import * as FileSystem from "expo-file-system";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface Task {
  content: string;
  status: boolean;
}
interface Prop {
  username: string;
  emailMember: string;
  isAdmin?: boolean;
}

const UpdateTask = ({ navigation }: any) => {
  const route = useRoute();
  const pramTask = route.params as any;

  const [selectColor, setSelectColor] = useState(appColors.primary);
  const [disablesubTask, setdisablesubTask] = useState(true);
  const [disableNote, setdisableNote] = useState(true);
  const [disableTask, setdisableTask] = useState(true);
  const [checked, setChecked] = useState(false);
  const [describle, setDescrible] = useState("");
  const [isList, setIsList] = useState(true);
  const [isListTask, setIsListTask] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [taskName, setTaskName] = useState("");
  const [showSubTaskForm, setShowSubTaskForm] = useState(false);
  const [subTask, setSubTask] = useState("");
  const [statusSubTask, setStatusSubTask] = useState(false);

  const [subTaskList, setsubTaskList] = useState<Task[]>([]);
  const [checkBoxSubTask, setCheckBoxSubTask] = useState(false);
  const [noteValue, setNoteValue] = useState("");
  const [noteList, setnoteList] = useState<any[]>([]);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [isShowTimePicker, setIsShowTimePicker] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [memberPlan, setmemberPlan] = useState<Prop[]>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [listMember, setListMember] = useState([]);
  const [memberTask, setMemberTask] = useState();
  const userPermissionRef = useRef<string | null>(null);

  const [file, setFile] = useState<{
    uri: string;
    name?: string;
    size?: number;
  } | null>(null);

  const valueColor = appInfo.listColor;
  useEffect(() => {
    pramTask.task.backgroundUri && setImage(pramTask.task.backgroundUri);
    pramTask.task.headerColor && setSelectColor(pramTask.task.headerColor);
    pramTask.task.taskInfo && setTaskName(pramTask.task.taskInfo);
    pramTask.task.taskDescription &&
      setDescrible(pramTask.task.taskDescription);
    pramTask.task.deadline && setDate(new Date(pramTask.task.deadline));
    pramTask.task.file && fecthFile(pramTask.task.file);
    pramTask.task.subTask && setsubTaskList(pramTask.task.subTask);
    pramTask.task.note && setnoteList(pramTask.task.note);
    pramTask.task.statusTask && setChecked(pramTask.task.statusTask);
  }, []);

  const handleGetApi = async () => {
    await checkUserTask();
    await getMemberTask();
  };

  useEffect(() => {
    handleGetApi();

    setdisablesubTask(!subTask);
    setdisableNote(!noteValue);
    setdisableTask(!taskName);
  }, [subTask, noteValue, taskName]);

  const updateTask = async () => {
    try {
      await ClientService.service(
        `/task/updateTask?taskId=${pramTask.task._id}`,
        {
          backgroundUri: image,
          headerColor: selectColor,
          taskInfo: taskName,
          taskDescription: describle,
          deadline: date,
          file: file?.uri,
          subTask: subTaskList,
          note: noteList,
        },
        "patch",
      );
      Alert.alert("Cập nhật nhiệm vụ thành công");
      navigation.goBack();
    } catch (error) {
      console.log("lỗi cập nhật nhiệm vụ", error);
    }
  };

  const fecthFile = async (uri: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.exists) {
        setFile({
          uri,
          name: fileInfo.uri.split("/").pop(),
          size: fileInfo.size,
        });
      }
    } catch (error) {
      console.log("lỗi lấy file", error);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Cần quyền truy cập thư viện ảnh!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
    if (!result.canceled && result.assets?.[0]) {
      setFile(result.assets[0]);
    }
  };

  const openFile = async () => {
    if (!file) {
      alert("Không có tệp nào để mở");
      return;
    }
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(file.uri);
    }
  };
  const removeItem = (
    indexValue: number,
    list: any[],
    setList: (newList: any[]) => void,
  ) => {
    const updatedList = [...list];
    updatedList.splice(indexValue, 1);
    setList(updatedList);
  };
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setIsShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setIsShowTimePicker(false);
    if (selectedTime) {
      setDate(selectedTime);
    }
  };

  const toggleTask = (index: number) => {
    setsubTaskList(
      subTaskList.map((task, i) => {
        if (i === index) {
          return { ...task, status: !task.status };
        }
        return task;
      }),
    );
  };
  const addTask = () => {
    if (subTask.trim() === "") return;
    setsubTaskList([...subTaskList, { content: subTask, status: false }]);
    setSubTask("");
  };
  const getParticipantInfo = async () => {
    try {
      const res = await ClientService.service(
        `/permission/getParticipantInfo?planId=${pramTask.planId}`,
      );
      setmemberPlan(res.data);
    } catch (error) {
      console.log("error get participant info", error);
    }
  };
  const addMemberTask = async (email: string) => {
    try {
      const res = await ClientService.service(
        "/permission/addMemberTask",
        {
          taskId: pramTask.task._id,
          emailMember: email,
        },
        "post",
      );
      console.log("res add member task", res.data);
      setListMember(res.data);
    } catch (error) {
      console.log("error add member task", error);
    }
  };
  const getMemberTask = async () => {
    try {
      const res = await ClientService.service(
        `/permission/getMemberTask?taskId=${pramTask.task._id}`,
      );
      setListMember(res.data);
    } catch (error) {
      console.log("error get member task", error);
    }
  };
  const checkUserTask = async () => {
    try {
      if (pramTask.isAdminOrMember === "member") {
        console.log("check user task", pramTask.task._id);
        const res = await ClientService.service(
          `/permission/checkUserTask?taskId=${pramTask.task._id}`,
        );
        const stringData: string = String(res.data);
        userPermissionRef.current = stringData;
      }
    } catch (error) {
      console.log("error check user task", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {/* background nhiệm vụ */}
        <View
          style={{
            paddingTop: appInfo.sizes.HEIGHT * 0.08,
          }}
        >
          <ImageBackground
            source={
              image
                ? { uri: image }
                : require("../../assets/img/background.png")
            }
            style={{
              width: "100%",
              height: appInfo.sizes.HEIGHT * 0.4,
            }}
          >
            <RowComponent
              justify="space-between"
              stylles={{
                paddingVertical: 10,
                backgroundColor: selectColor,
                paddingHorizontal: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="arrow-back"
                  size={24}
                  color={appColors.white}
                  style={{ alignItems: "center", justifyContent: "center" }}
                />
              </TouchableOpacity>
              {pramTask.isAdminOrMember === "admin" && (
                <RowComponent>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                      getParticipantInfo();
                    }}
                  >
                    <IconMertial
                      name="person-add"
                      size={24}
                      color={appColors.white}
                      style={{ marginRight: 30 }}
                    />
                  </TouchableOpacity>

                  <IconMertial
                    name="more-vert"
                    size={24}
                    color={appColors.white}
                  />
                </RowComponent>
              )}
            </RowComponent>
            <TouchableOpacity
              onPress={pickImage}
              style={{
                marginTop: appInfo.sizes.HEIGHT * 0.2,
                marginLeft: appInfo.sizes.WIDTH * 0.06,
                backgroundColor: appColors.iconColor,
                borderRadius: 10,
                justifyContent: "center",
                padding: 5,
                alignSelf: "flex-start",
              }}
            >
              <RowComponent align="center" stylles={{ padding: 4 }}>
                <MaterialIcons name="photo" size={24} color="black" />
                <Text>Thêm ảnh bìa</Text>
              </RowComponent>
            </TouchableOpacity>
            {/* danh sách màu header */}
            <View
              style={{
                flexDirection: "row",
                marginVertical: 15,
                paddingLeft: 5,
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
          </ImageBackground>
        </View>
        <View style={{ flex: 1, backgroundColor: "#f1f2f4" }}>
          <View
            style={{
              backgroundColor: "white",
              paddingBottom: 17,
              paddingHorizontal: 15,
            }}
          >
            <RowComponent stylles={{ marginTop: 10 }} align="center">
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
                <TextInput
                  value={taskName}
                  onChangeText={(val) => {
                    setTaskName(val);
                  }}
                  placeholder="Nhiệm vụ cần làm"
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
            <RowComponent align="center">
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
          <View
            style={{
              backgroundColor: "#f1f5f9",
              padding: 20,
              margin: 16,
              borderRadius: 16,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 3 },
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#1e293b",
                marginBottom: 12,
              }}
            >
              Danh sách thành viên
            </Text>

            {listMember.map((member: any, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: "#fff",
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    marginBottom: 10,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "#e2e8f0",
                  }}
                >
                  <Text style={{ fontSize: 16, color: "#334155" }}>
                    {member.username}
                  </Text>
                </View>
              );
            })}
          </View>

          <View
            style={{
              backgroundColor: "white",
              paddingVertical: 17,
              paddingHorizontal: 15,
              marginTop: 20,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setIsShowPopup(true);
              }}
            >
              <RowComponent align="center">
                <MaterialIcons
                  name="access-time"
                  size={24}
                  color={appColors.iconColor}
                />
                <TextComponents
                  text="Thời gian hết hạn"
                  size={16}
                  styles={{ marginLeft: 10 }}
                />
              </RowComponent>
              {date && (
                <Text
                  style={{
                    color: appColors.gray,
                    fontSize: 16,
                    paddingTop: 15,
                  }}
                >
                  Đến hạn lúc: {date.toLocaleString()}
                </Text>
              )}
            </TouchableOpacity>
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
            <TouchableOpacity onPress={pickFile}>
              <Icon1 name="add" size={24} color="black" />
            </TouchableOpacity>
          </RowComponent>
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 15,
              paddingVertical: 17,
            }}
          >
            <TouchableOpacity
              onPress={() => setIsList(!isList)}
            ></TouchableOpacity>
            {isList && (
              <>
                <RowComponent
                  justify="space-between"
                  align="center"
                  stylles={{
                    flex: 1,
                  }}
                >
                  <TouchableOpacity onPress={openFile}>
                    <View style={{ flex: 1, width: "90%" }}>
                      <TextComponents text={file?.name || ""} size={16} />
                      <TextComponents
                        text={
                          `${Math.round((file?.size ?? 0) / 1024 / 1024)} MB` ||
                          ""
                        }
                        color={appColors.gray}
                        size={16}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Icon1
                      name="more-vert"
                      size={24}
                      color={appColors.iconColor}
                    />
                  </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => setShowSubTaskForm(!showSubTaskForm)}
            >
              <Icon1 name="add" size={24} color="black" />
            </TouchableOpacity>
          </RowComponent>
          {/* form nhập thông tin nhiệm vụ phụ */}
          {showSubTaskForm && (
            <View
              style={{
                backgroundColor: "white",
                paddingHorizontal: 15,
                paddingVertical: 17,
              }}
            >
              <RowComponent align="center">
                <TextInput
                  style={{ flex: 1 }}
                  value={subTask}
                  onChangeText={(val) => {
                    setSubTask(val);
                  }}
                  placeholder="Thêm nhiệm vụ phụ"
                />

                <TouchableOpacity
                  onPress={() => setShowSubTaskForm(false)}
                  style={{
                    width: appInfo.sizes.WIDTH * 0.2,
                    height: appInfo.sizes.HEIGHT * 0.04,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "red",
                    marginRight: 5,
                  }}
                >
                  <Text style={{ color: "red", fontWeight: 600 }}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    addTask();
                  }}
                  disabled={disablesubTask}
                  style={{
                    width: appInfo.sizes.WIDTH * 0.25,
                    height: appInfo.sizes.HEIGHT * 0.04,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,

                    backgroundColor: disablesubTask
                      ? appColors.boderColor
                      : appColors.primary,
                  }}
                >
                  <Text style={{ color: appColors.white, fontWeight: 600 }}>
                    Thêm
                  </Text>
                </TouchableOpacity>
              </RowComponent>

              {isListTask && <></>}
            </View>
          )}
          {/* danh sách nhiệm vụ phụ */}
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
            {isListTask &&
              subTaskList.map((subTaskValue, index) => {
                return (
                  <RowComponent
                    key={index}
                    justify="space-between"
                    stylles={{ paddingTop: 26 }}
                  >
                    {subTaskValue.status ? (
                      <TouchableOpacity onPress={() => toggleTask(index)}>
                        <MaterialIcons
                          name="check-box"
                          size={24}
                          color="green"
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => toggleTask(index)}>
                        <MaterialIcons
                          name="check-box-outline-blank"
                          size={24}
                          color={appColors.iconColor}
                        />
                      </TouchableOpacity>
                    )}
                    <TextComponents text={subTaskValue.content} size={16} />
                    <TouchableOpacity
                      onPress={() =>
                        removeItem(index, subTaskList, setsubTaskList)
                      }
                    >
                      <MaterialIcons
                        name="delete-outline"
                        size={24}
                        color="red"
                      />
                    </TouchableOpacity>
                  </RowComponent>
                );
              })}
          </View>

          <View style={{ flex: 1, paddingHorizontal: 15 }}>
            <RowComponent justify="space-between" stylles={{ marginTop: 20 }}>
              <TextComponents
                text="Ghi chú"
                size={16}
                styles={{ fontWeight: 600 }}
              />
              <Icon1 name="more-vert" size={24} color={appColors.textColor} />
              {/* thông tin ghi chú */}
            </RowComponent>

            {noteList.map((noteListValue, index) => {
              return (
                <RowComponent
                  key={index}
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
                        {noteListValue}
                      </Text>
                    </View>
                  </RowComponent>
                  <TouchableOpacity
                    onPress={() => removeItem(index, noteList, setnoteList)}
                  >
                    <MaterialIcons name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </RowComponent>
              );
            })}
            {/* lưu tất cả thông tin nhiệm vụ */}
            {(userPermissionRef.current === "memberTask" ||
              pramTask.isAdminOrMember === "admin") && (
              <TouchableOpacity
                onPress={updateTask}
                disabled={disableTask}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  backgroundColor: disableTask
                    ? appColors.gray
                    : appColors.primary,
                  borderRadius: 10,
                  marginBottom: 100,
                  marginTop: 40,
                  width: "100%",
                  height: appInfo.sizes.HEIGHT * 0.06,
                }}
              >
                <TextComponents
                  text="Cập nhật nhiệm vụ"
                  color={appColors.white}
                  styles={{ fontWeight: 500 }}
                />
              </TouchableOpacity>
            )}
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
            placeholder="Thêm ghi chú của bạn"
            style={{
              flex: 1,
              backgroundColor: appColors.white,
              padding: 10,
              fontSize: 16,
            }}
            value={noteValue}
            onChangeText={(val) => setNoteValue(val)}
          />
          <TouchableOpacity
            onPress={() => {
              setnoteList([...noteList, noteValue]);
              setNoteValue("");
            }}
            disabled={disableNote}
          >
            <MaterialIcons
              name="send"
              size={24}
              color={disableNote ? appColors.iconColor : appColors.primary}
            />
          </TouchableOpacity>
        </RowComponent>
      </View>
      <Modal visible={isShowPopup} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>Chọn thời gian hết hạn</Text>

            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setIsShowDatePicker(true)}
            >
              <Text style={styles.selectText}>
                {date ? date.toLocaleDateString() : "Chưa chọn ngày"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setIsShowTimePicker(true)}
            >
              <Text style={styles.selectText}>
                {date
                  ? date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Chưa chọn giờ"}
              </Text>
            </TouchableOpacity>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsShowPopup(false)}
              >
                <Text style={styles.cancelText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setIsShowPopup(false)}
              >
                <Text style={styles.confirmText}>Hoàn tất</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {isShowDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {isShowTimePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={{ backgroundColor: appColors.white, padding: 20 }}>
          <Text style={styles.title}>Danh sách thành viên kế hoạch</Text>
          <FlatList
            data={memberPlan}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => addMemberTask(item.emailMember)}
              >
                <Text>{item.username}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.cancelText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default UpdateTask;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    maxHeight: "70%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  selectButton: {
    width: "100%",
    paddingVertical: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  selectText: {
    fontSize: 16,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelText: {
    fontSize: 16,
    color: "#888",
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});
