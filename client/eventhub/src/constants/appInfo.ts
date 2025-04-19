import { Dimensions } from "react-native";
import { appColors } from "./appColor";

export const appInfo = {
  sizes: {
    WIDTH: Dimensions.get("window").width,
    HEIGHT: Dimensions.get("window").height,
    sizeMain: 24,
  },
  BASE_URL: "http://192.168.81.113:3001",
  listColor: [
    appColors.primary,
    "#8BC34A", // Green
    "#E91E63", // Pink
    "#FFC107", // Amber
    "#673AB7", // Deep Purple
    "#009688", // Teal
  ],
};
