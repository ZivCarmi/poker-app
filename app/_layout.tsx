import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  Slot,
  Stack,
  Tabs,
  useRootNavigationState,
  useRouter,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Appearance, Platform } from "react-native";
import { AuthProvider, useAuth } from "~/context/auth-context";
import { MeetingProvider } from "~/context/meeting-context";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "~/components/ThemeToggle";
import ThemeTabs from "~/components/ThemeTabs";

export const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
export const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
});

export default function RootLayout() {
  usePlatformSpecificSetup();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            backgroundColor={
              isDarkColorScheme
                ? DARK_THEME.colors.background
                : LIGHT_THEME.colors.background
            }
          />
          <InnerLayout />
        </SafeAreaView>
      </ThemeProvider>
    </AuthProvider>
  );
}

function InnerLayout() {
  const { user } = useAuth();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  React.useEffect(() => {
    if (!navigationState?.key) return;

    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  return <Slot />;
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add("bg-background");
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
  }, []);
}

function noop() {}
