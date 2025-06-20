import { Stack } from "expo-router";
import NewGroupButton from "~/components/NewGroupButton";

const GroupsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontSize: 22,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Groups", headerRight: () => <NewGroupButton /> }}
      />
      <Stack.Screen
        name="new-group"
        options={{ title: "New Group", animation: "fade_from_bottom" }}
      />
    </Stack>
  );
};

export default GroupsLayout;
