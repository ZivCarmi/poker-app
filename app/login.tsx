import { Redirect } from "expo-router";
import { View } from "react-native";
import Auth from "~/components/Auth";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/context/auth-context";

const Login = () => {
  const { user, isReady } = useAuth();

  if (!isReady) {
    return null;
  }

  if (user) {
    return <Redirect href="/" />;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", paddingBottom: 120 }}>
      <View
        style={{
          flex: 1,
          paddingTop: 180,
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text className="text-3xl">Poker App</Text>
        <Text className="text-center">
          Track your stats. Beat your buddies.{"\n"}
          Sign in to get started!
        </Text>
      </View>
      <Auth />
    </View>
  );
};

export default Login;
