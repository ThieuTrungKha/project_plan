const { Expo } = require("expo-server-sdk");
const expo = new Expo();

async function sendPushNotification(pushToken, message) {
    try {
        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`[ERROR] Token không hợp lệ: ${pushToken}`);
            return;
        }

        console.log(`[INFO] Đang gửi thông báo đến token: ${pushToken}`);
        const response = await expo.sendPushNotificationsAsync([
            {
                to: pushToken,
                sound: "default",
                body: message,
            },
        ]);

        console.log(`[SUCCESS] Gửi thông báo thành công: ${message}`);
        console.log(`[DEBUG] Phản hồi từ Expo:`, response);
    } catch (error) {
        console.error(`[ERROR] Lỗi khi gửi thông báo: ${error.message}`);
        console.error(error);
    }
}

module.exports = { sendPushNotification };
