import { Platform } from "react-native";

const devUrl =
  Platform.OS === "web"
    ? "http://localhost:3000"
    : `http://${process.env.EXPO_PUBLIC_PC_IP}:3000`;
export const BASE_URL =
  process.env.NODE_ENV === "production" ? undefined : devUrl;
