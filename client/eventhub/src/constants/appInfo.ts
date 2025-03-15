import { Dimensions } from "react-native";

export const appInfo = {
  sizes: {
    WIDTH: Dimensions.get("window").width,
    HEIGHT: Dimensions.get("window").height,
    sizeMain: 24,
  },
  BASE_URL: "http://192.168.1.10:3001",
};
