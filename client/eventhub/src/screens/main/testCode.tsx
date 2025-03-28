import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Định nghĩa kiểu dữ liệu cho một nhiệm vụ
interface Task {
  text: string;
  completed: boolean;
}

export default function App() {
  const [task, setTask] = useState<string>(""); // Lưu trữ nhiệm vụ người dùng nhập vào
  const [tasks, setTasks] = useState<Task[]>([]); // Danh sách nhiệm vụ

  // Thêm nhiệm vụ vào danh sách
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask(""); // Xóa input sau khi thêm
  };

  // Đánh dấu nhiệm vụ hoàn thành
  const toggleTask = (index: number) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nhập nhiệm vụ..."
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
      <Button title="Thêm nhiệm vụ" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(_, index) => index.toString()} // Dùng index làm key
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => toggleTask(index)}
            style={[styles.taskItem, item.completed && styles.completed]}
          >
            <Text
              style={[styles.taskText, item.completed && styles.completedText]}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Định nghĩa styles để dễ bảo trì code
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },
  completed: {
    backgroundColor: "lightgreen",
  },
  taskText: {
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
  },
});
