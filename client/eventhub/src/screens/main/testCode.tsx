import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlanCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.topSection}>
        <Text style={styles.topText}>Tên kế hoạch của bạn</Text>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.bottomText}>
          Mô tả kế hoạch của bạn như thế nào ở đây
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200, // Điều chỉnh chiều rộng theo ý muốn
    borderRadius: 10,
    overflow: "hidden", // Để bo tròn góc của view con
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topSection: {
    backgroundColor: "mediumseagreen", // Màu xanh lá cây như trong hình
    padding: 20,
    alignItems: "center",
  },
  topText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomSection: {
    backgroundColor: "mediumseagreen", // Màu xanh lá cây như trong hình
    padding: 20,
    alignItems: "center",
    marginTop: -20, // Để tạo hiệu ứng chồng lên
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bottomText: {
    color: "white",
    fontSize: 14,
  },
});

export default PlanCard;
