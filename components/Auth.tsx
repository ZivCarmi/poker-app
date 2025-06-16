import { makeRedirectUri, ResponseType } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { useAuthRequest } from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/context/auth-context";
import { supabase } from "~/lib/supabase";

WebBrowser.maybeCompleteAuthSession();

const config = {
  androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
};

const redirectUri = makeRedirectUri({
  scheme: "com.zivcarmi.pokerapp",
});

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  console.log("Session data:", data.session);

  if (error) throw error;
  return data.session;
};

export function performGoogleLogin() {
  const [request, response, promptAsync] = useAuthRequest({
    responseType: "id_token", // without it - auth works but im not getting anything from result with promptAsync()... need to figure out
    clientId:
      Platform.OS === "android"
        ? config.androidClientId
        : Platform.OS === "ios"
        ? config.iosClientId
        : config.webClientId,
    redirectUri,
    scopes: ["openid", "profile", "email"],
    extraParams: {
      nonce: "random-nonce", // חובה כשמשתמשים ב-id_token
    },
  });

  const signIn = async () => {
    if (Platform.OS === "web") {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUri,
          skipBrowserRedirect: true,
        },
      });

      console.log(error, data);

      if (error) throw error;

      const res = await WebBrowser.openAuthSessionAsync(
        data?.url ?? "",
        redirectUri
      );

      if (res.type === "success") {
        const { url } = res;
        await createSessionFromUrl(url);
      }
    } else {
      const result = await promptAsync();

      console.log("result.type: ", result.type);

      if (result.type === "success") {
        console.log(result.authentication);

        const idToken = result.authentication?.idToken;

        if (idToken) {
          const { error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: idToken,
          });

          if (error) {
            console.error("Supabase login error:", error.message);
          }
        }
      }
    }
  };

  return { request, response, signIn };
}

export default function Auth() {
  const { signIn } = performGoogleLogin();
  const { user, loading } = useAuth();

  if (user) return null; // If user is already logged in, don't show the button

  return (
    <Button onPress={signIn} className="bg-blue-500">
      <Text>Sign in with Google 2</Text>
    </Button>
  );
}
