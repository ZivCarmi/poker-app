import { Tabs } from "expo-router";
import { Home, User, Users2 } from "lucide-react-native";
import { DARK_THEME, LIGHT_THEME } from "~/app/_layout";
import { ThemeToggle } from "~/components/ThemeToggle";
import { useColorScheme } from "~/lib/useColorScheme";

const TabsLayout = () => {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkColorScheme
          ? DARK_THEME.colors.text
          : LIGHT_THEME.colors.text,
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
        headerTitleStyle: {
          fontSize: 22,
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <Home size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(groups)"
        options={{
          headerShown: false,
          tabBarLabel: "Groups",
          tabBarIcon: ({ color }) => <Users2 size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "My Profile",
          tabBarLabel: "Profile",
          headerRight: () => <ThemeToggle />,
          tabBarIcon: ({ color }) => <User size={26} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
