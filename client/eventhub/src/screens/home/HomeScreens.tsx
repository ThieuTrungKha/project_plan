import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { removeAuth } from "../../redux/reducers/authReducer";
import { appColors } from "../../constants/appColor";
import { TextComponents } from "../../components";
import PlanApiService from "../../apis/planApi";
import { useFocusEffect } from "@react-navigation/native";

interface Plan {
  _id: string;
  planName: string;
  planDescription: string;
  photoUrlBackground: string;
}

const TrelloSampleScreen = ({ navigation }: any) => {
  const [planData, setPlanData] = useState<Plan[]>([]);

  const getDataPlan = async () => {
    try {
      const res = await PlanApiService.planService("/getPlan");
      setPlanData(res.data);
    } catch (error) {
      console.log("error getting plan list", error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getDataPlan();
      return () => {};
    }, []),
  );

  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: StatusBar.currentHeight }]}
    >
      <StatusBar barStyle="dark-content" />

      <ScrollView style={styles.contentContainer}>
        <View style={styles.mainCard}>
          <Text style={styles.mainCardTitle}>
            Dự án phần mềm web quản lý phòng trọ Chon Tâm
          </Text>
          <Text style={styles.mainCardSubtitle}>Xây dựng back-end</Text>

          <TouchableOpacity style={styles.addCardButton}>
            <Text style={styles.addCardButtonText}>Thêm thẻ</Text>
          </TouchableOpacity>
        </View>

        <Text
          style={styles.sectionTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Các bảng không gian làm việc của bạn
        </Text>

        <View style={styles.boardContainer}>
          {planData.map((plan) => (
            <TouchableOpacity
              key={plan._id}
              style={[
                styles.boardItem,
                { backgroundColor: plan.photoUrlBackground },
              ]}
              onPress={() => {
                navigation.navigate("DetailPlanScreen", { id: plan._id });
              }}
            >
              <TextComponents
                text={plan.planName}
                color={appColors.white}
                styles={{ padding: 5, fontWeight: "600" }}
              />
              <View
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  width: "100%",
                  height: "60%",
                  padding: 5,
                }}
              >
                <Text style={{ color: appColors.white }}>
                  {plan.planDescription}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("CreatePlan")}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.buttonText}>Tạo kế hoạch</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TrelloSampleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEE", // Màu nền header
  },
  headerLeft: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerRight: {
    fontSize: 16,
    color: "#007AFF",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  mainCard: {
    backgroundColor: "#FAFAFA",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  mainCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  mainCardSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  addCardButton: {
    alignSelf: "flex-start",
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  addCardButtonText: {
    color: "#FFF",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 12,
  },
  boardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  boardItem: {
    width: "48%",
    height: 100,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  boardItemText: {
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  createBoardButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 16,
  },
  createBoardButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF", // Màu tím giống ảnh
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5, // Đổ bóng Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    width: 170,
    height: 60,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
