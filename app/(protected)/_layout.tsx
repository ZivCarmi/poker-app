import { Redirect, Stack } from "expo-router";
import { useAuth } from "~/context/auth-context";
import { MeetingProvider } from "~/context/meeting-context";

export const unstable_settings = {
  initialRouteName: "(tabs)", // anchor
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
    <MeetingProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </MeetingProvider>
  );
};

export default ProtectedLayout;
