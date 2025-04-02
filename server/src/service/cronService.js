const cron = require("node-cron");
const { sendPushNotification } = require("./notificationService");
const TaskModel = require("../model/taskModel");

function scheduleNotifications() {
    cron.schedule("* * * * *", async () => {
        console.log("[INFO] Đang kiểm tra thông báo...");
        const now = new Date();

        try {
            const notifications = await TaskModel.find({ deadline: { $lte: now }, sent: false });
            console.log(`[INFO] Tìm thấy ${notifications.length} thông báo cần gửi.`, notifications);
            const check = await TaskModel.find({ sent: false });
            console.log('------------', check)
            for (const notification of notifications) {
                if (!notification.pushToken || typeof notification.pushToken !== "string") {
                    console.error(`[ERROR] Thiếu hoặc lỗi pushToken trong thông báo:`, notification);
                    continue;
                }

                try {
                    console.log(`[INFO] Đang gửi thông báo cho token: ${notification.pushToken}`);
                    await sendPushNotification(notification.pushToken, notification.taskInfo);
                    console.log(`[SUCCESS] Đã gửi thông báo cho task: ${notification.taskInfo}`);
                    await TaskModel.updateOne({ _id: notification._id }, { $set: { sent: true } });
                    console.log(`[INFO] Đã đánh dấu gửi thành công cho ID: ${notification._id}`);

                } catch (error) {
                    console.error(`[ERROR] Lỗi khi gửi thông báo: ${error.message}`);
                    console.error(error);
                }
            }

        } catch (error) {
            console.error(`[ERROR] Lỗi khi truy vấn thông báo từ MongoDB: ${error.message}`);
            console.error(error);
        }
    });
}

module.exports = { scheduleNotifications };
