import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { DARK_THEME, LIGHT_THEME } from "~/app/_layout";
import { useColorScheme } from "~/lib/useColorScheme";
import { ThemeToggle } from "./ThemeToggle";

const ThemeTabs = () => {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkColorScheme
          ? DARK_THEME.colors.text
          : LIGHT_THEME.colors.text,
        headerRight: () => <ThemeToggle />,
        tabBarStyle: {
          height: 70,
          paddingVertical: 0,
        },
        tabBarItemStyle: {
          alignItems: "center",
          flexDirection: "row",
        },
        tabBarLabelStyle: {
          paddingTop: 4,
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          headerShown: false,
          tabBarLabel: "Groups",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="group" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="+not-found"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};

export default ThemeTabs;
