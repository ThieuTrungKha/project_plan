import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Alert } from "react-native";

// Hàm đăng ký push notification
export async function registerForPushNotificationsAsync() {
  try {
    if (!Device.isDevice) {
      console.error(
        "Bạn đang chạy trên trình giả lập. Không thể lấy Push Token!",
      );
      Alert.alert("Lỗi", "Phải chạy trên thiết bị thật để lấy token!");
      return null;
    }

    // Kiểm tra quyền thông báo
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    console.log("📌 Trạng thái quyền ban đầu:", existingStatus);

    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.error("Không có quyền nhận thông báo.");
      Alert.alert(
        "Lỗi",
        "Ứng dụng không có quyền nhận thông báo. Hãy kiểm tra lại cài đặt!",
      );
      return null;
    }

    // Lấy push token
    const pushToken = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Lấy thành công Push Token:", pushToken);

    return pushToken;
  } catch (error) {
    console.error("Lỗi lấy Push Token:", error);
    Alert.alert(
      "Lỗi",
      "Đã xảy ra lỗi khi lấy Push Token. Hãy kiểm tra console để biết chi tiết.",
    );
    return null;
  }
}
