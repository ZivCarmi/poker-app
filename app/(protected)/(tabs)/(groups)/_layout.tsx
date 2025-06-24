import { Stack } from "expo-router";
import NewGroupButton from "~/components/NewGroupButton";
import NewMeetingButton from "~/components/NewMeetingButton";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

const GroupsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontSize: 22,
        },
        headerShadowVisible: false,
        // headerLeft: () => <View style={{ marginLeft: -16, marginRight: 16 }} />,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Groups", headerRight: () => <NewGroupButton /> }}
      />
      <Stack.Screen
        name="new-group"
        options={{
          title: "New Group",
          animation: "fade_from_bottom",
        }}
      />
      <Stack.Screen
        name="[groupId]"
        options={{
          headerShown: false,
          headerRight: () => <NewMeetingButton />,
        }}
      />
    </Stack>
  );
};

export default GroupsLayout;
