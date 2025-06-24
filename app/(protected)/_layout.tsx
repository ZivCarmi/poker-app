import { Redirect, Stack } from "expo-router";
import { useAuth } from "~/context/auth-context";
import { GroupProvider } from "~/context/group-context";
import { MeetingProvider } from "~/context/meeting-context";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "(tabs)",
};

const ProtectedLayout = () => {
  const { user, isReady } = useAuth();

  if (!isReady) {
    return null;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <GroupProvider>
      <MeetingProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </MeetingProvider>
    </GroupProvider>
  );
};

export default ProtectedLayout;
