import { Platform } from "react-native";

const devUrl =
  Platform.OS === "web" ? "http://localhost:3000" : "http://192.168.1.100:3000";
export const BASE_URL =
  process.env.NODE_ENV === "production" ? undefined : devUrl;
