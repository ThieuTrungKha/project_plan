import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeAuth } from "../../redux/reducers/authReducer";
import { useDispatch } from "react-redux";

const CircularCheckbox = () => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="logout"
        onPress={async () => {
          await AsyncStorage.clear();
          dispatch(removeAuth({}));
        }}
      />
    </View>
  );
};

export default CircularCheckbox;
