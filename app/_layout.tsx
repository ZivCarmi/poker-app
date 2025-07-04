import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Appearance, Platform, View } from "react-native";
import { AuthProvider } from "~/context/auth-context";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";

export const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
export const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

const client = new QueryClient();

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
  const { isDarkColorScheme } = useColorScheme();

  usePlatformSpecificSetup();

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <StatusBar
            backgroundColor={
              isDarkColorScheme
                ? DARK_THEME.colors.background
                : LIGHT_THEME.colors.background
            }
            translucent={false}
          />
          <View className="flex-1 justify-center items-center">
            <View className="w-full h-full max-w-screen-sm">
              <Stack>
                <Stack.Screen
                  name="(protected)"
                  options={{
                    headerShown: false,
                    animation: "none",
                  }}
                />
                <Stack.Screen
                  name="login"
                  options={{
                    headerShown: false,
                    animation: "none",
                  }}
                />
                <Stack.Screen
                  name="invite"
                  options={{
                    headerShown: false,
                    animation: "none",
                  }}
                />
              </Stack>
            </View>
          </View>
          <PortalHost />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
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
